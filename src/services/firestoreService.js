import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "../config/firebase/config";

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
