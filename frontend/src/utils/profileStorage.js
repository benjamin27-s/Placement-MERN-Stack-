const PROFILE_STORAGE_KEY = "bridger_profile_v1";

export const profileStorageKey = PROFILE_STORAGE_KEY;

export function getProfile() {
  if (typeof window === "undefined" || !window.localStorage) {
    return { completed: false };
  }

  const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!raw) return { completed: false };

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    // ignore
  }

  return { completed: false };
}

export function saveProfile(profile) {
  if (typeof window === "undefined" || !window.localStorage) return;
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function clearProfile() {
  if (typeof window === "undefined" || !window.localStorage) return;
  window.localStorage.removeItem(PROFILE_STORAGE_KEY);
}

