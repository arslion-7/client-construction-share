import { useEffect, useRef } from 'react';

export const useFocusInput = () => {
  const focusInput = useRef(null);

  useEffect(() => {
    if (focusInput && focusInput.current) focusInput.current.focus();
  }, []);

  return focusInput;
};
