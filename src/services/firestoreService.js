import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "../config/firebase/config";

const CHAT_RATE_LIMIT_WINDOW_MS = 60 * 1000;

function sanitizeForFirestore(value) {
  if (value === undefined) {
    return null;
  }

  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeForFirestore);
  }

  return Object.entries(value).reduce((acc, [key, val]) => {
    if (val !== undefined) {
      acc[key] = sanitizeForFirestore(val);
    }
    return acc;
  }, {});
}

function getCurrentUserId() {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error("User not logged in. Sign in again to save search history.");
  }
  return userId;
}

export async function createUserProfile(
  userId,
  { firstName, lastName, email, lat = null, lng = null, location = "" }
) {
  await setDoc(doc(firestore, "users", userId), {
    firstName,
    lastName,
    email,
    lat,
    lng,
    location,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function ensureUserProfile(userId, email) {
  const userRef = doc(firestore, "users", userId);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      email,
      firstName: "",
      lastName: "",
      lat: null,
      lng: null,
      location: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

export async function updateUserLocation(userId, { lat, lng, location }) {
  await updateDoc(doc(firestore, "users", userId), {
    lat,
    lng,
    location,
    updatedAt: serverTimestamp(),
  });
}

export async function saveSearchHistory(entry) {
  const userId = getCurrentUserId();

  await ensureUserProfile(userId, auth.currentUser.email || "");

  await addDoc(collection(firestore, "users", userId, "searchHistory"), {
    query: entry.query,
    queryType: entry.queryType,
    locationLabel: entry.locationLabel || entry.query,
    weather: sanitizeForFirestore(entry.weather),
    forecast: sanitizeForFirestore(entry.forecast),
    searchedAt: serverTimestamp(),
  });
}

export async function getSearchHistory(maxResults = 10) {
  const userId = getCurrentUserId();

  const historyQuery = query(
    collection(firestore, "users", userId, "searchHistory"),
    orderBy("searchedAt", "desc"),
    limit(maxResults)
  );

  const snapshot = await getDocs(historyQuery);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function consumeChatRateLimit({
  maxMessages = 5,
  windowMs = CHAT_RATE_LIMIT_WINDOW_MS,
} = {}) {
  const userId = getCurrentUserId();
  const userRef = doc(firestore, "users", userId);

  return runTransaction(firestore, async (transaction) => {
    const snapshot = await transaction.get(userRef);
    const now = Date.now();
    const data = snapshot.exists() ? snapshot.data() : {};
    const storedTimestamps = Array.isArray(data.chatRateLimitTimestamps)
      ? data.chatRateLimitTimestamps
      : [];

    const recentTimestamps = storedTimestamps.filter(
      (timestamp) => typeof timestamp === "number" && now - timestamp < windowMs
    );

    if (recentTimestamps.length >= maxMessages) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterMs: windowMs - (now - recentTimestamps[0]),
      };
    }

    const nextTimestamps = [...recentTimestamps, now];

    const baseData = snapshot.exists()
      ? {
          chatRateLimitTimestamps: nextTimestamps,
          updatedAt: serverTimestamp(),
        }
      : {
          email: auth.currentUser?.email || "",
          firstName: "",
          lastName: "",
          lat: null,
          lng: null,
          location: "",
          createdAt: serverTimestamp(),
          chatRateLimitTimestamps: nextTimestamps,
          updatedAt: serverTimestamp(),
        };

    transaction.set(userRef, baseData, { merge: true });

    return {
      allowed: true,
      remaining: maxMessages - nextTimestamps.length,
      retryAfterMs: 0,
    };
  });
}

export async function createChatSession() {
  const userId = getCurrentUserId();

  await ensureUserProfile(userId, auth.currentUser?.email || "");

  const sessionRef = await addDoc(collection(firestore, "users", userId, "chatSessions"), {
    title: "New chat",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return sessionRef.id;
}

export async function getLatestChatSession() {
  const userId = getCurrentUserId();

  const sessionQuery = query(
    collection(firestore, "users", userId, "chatSessions"),
    orderBy("updatedAt", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(sessionQuery);
  if (snapshot.empty) {
    return null;
  }

  const sessionDoc = snapshot.docs[0];
  return {
    id: sessionDoc.id,
    ...sessionDoc.data(),
  };
}

export async function getChatSessionMessages(sessionId) {
  const userId = getCurrentUserId();

  const messagesQuery = query(
    collection(firestore, "users", userId, "chatSessions", sessionId, "messages"),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(messagesQuery);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function saveChatMessage(sessionId, message) {
  const userId = getCurrentUserId();
  const sessionRef = doc(firestore, "users", userId, "chatSessions", sessionId);

  await addDoc(collection(sessionRef, "messages"), {
    role: message.role,
    content: message.content,
    createdAt: serverTimestamp(),
  });

  await setDoc(
    sessionRef,
    {
      updatedAt: serverTimestamp(),
      title:
        message.role === "user" && message.content
          ? message.content.slice(0, 60)
          : "New chat",
    },
    { merge: true }
  );
}
