import { useEffect, useRef } from 'react';

export const useFocusInput = () => {
  const inputRef = useRef(null); // More descriptive name

  useEffect(() => {
    if (inputRef.current) {
      // Simplified check
      // @ts-expect-error focus() exists on the underlying input DOM element
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
};
