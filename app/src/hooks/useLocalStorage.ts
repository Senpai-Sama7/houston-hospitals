import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      // Silently ignore storage errors (e.g., quota exceeded)
    }
  }, [key, stored]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== key) return;
      if (e.newValue === null) {
        setStored(initialValue);
        return;
      }
      try {
        setStored(JSON.parse(e.newValue) as T);
      } catch {
        // Ignore parse errors from other tabs
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, initialValue]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStored((prev) => {
      const next = value instanceof Function ? value(prev) : value;
      return next;
    });
  }, []);

  return [stored, setValue];
}