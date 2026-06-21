import { reverseGeocodeLabel } from "../api/weather";

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
};

export function getCurrentUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const location = await reverseGeocodeLabel(lat, lng);
          resolve({ lat, lng, location });
        } catch {
          resolve({ lat, lng, location: `${lat}, ${lng}` });
        }
      },
      () => resolve(null),
      GEOLOCATION_OPTIONS
    );
  });
}
