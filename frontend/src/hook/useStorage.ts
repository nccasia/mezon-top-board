import { useState } from "react";

function useStorage<T>(type: 'localStorage' | 'sessionStorage', key: string, defaultValue?: T): [T, (value: T | ((prevValue: T) => T)) => void] {
  const storage = type === 'localStorage' ? localStorage : sessionStorage;

  // Initialize state with a function to read from storage
  const [storageValue, setStorageValue] = useState<T>(() => {
    try {
      const storedValue = storage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Function to update both storage and state
  const setStorageStateValue = (valueOrFn: T | ((prevValue: T) => T)) => {
    const newValue = typeof valueOrFn === "function"
      ? (valueOrFn as (prevValue: T) => T)(storageValue)
      : valueOrFn;

    try {
      storage.setItem(key, JSON.stringify(newValue));
    } catch {
      console.error("Failed to save to storage");
    }

    setStorageValue(newValue);
  };

  return [storageValue, setStorageStateValue];
}

export default useStorage;
