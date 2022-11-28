import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates token as state and look in LS for current value
 * (if not found, defaults to `firstValue`)
 *
 * When token changes, it updates the effect:
 * - if new state is null, removes from LS
 * - else, updates LS
 *
 * To the component, this just acts like state that is also synced to/from localStorage
 *
 *   const [token, setToken] = useLocalStorage("token")
 */

function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKeyInLocalStorage() {
      if (item === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}

export default useLocalStorage;
