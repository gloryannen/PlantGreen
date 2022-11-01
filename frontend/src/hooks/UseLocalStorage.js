import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue = null) => {
  const [state, setState] = useState(() => {
    let value = window.localStorage.getItem(key) || defaultValue;
    return value;
  });

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
};

export default useLocalStorage;
