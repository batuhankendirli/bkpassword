import { useState, useEffect } from 'react';

/**
 * A hook that detects virtual keyboard visibility on mobile devices
 * and returns the keyboard height to adjust UI accordingly
 */
const useKeyboardDetector = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const initialHeight = window.visualViewport?.height || window.innerHeight;
    let isInputFocused = false;

    const checkKeyboardHeight = () => {
      if (!initialHeight) return;

      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialHeight - currentHeight;

      if (window.innerWidth >= 960) {
        setKeyboardHeight(0);
        return;
      }

      if (heightDifference > 100 && isInputFocused) {
        setKeyboardHeight(heightDifference);
      } else if (heightDifference < 30) {
        setKeyboardHeight(0);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        isInputFocused = true;
        setTimeout(checkKeyboardHeight, 10);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        // Check if another input is not focused
        setTimeout(() => {
          if (!document.activeElement?.matches('input, textarea')) {
            isInputFocused = false;
            setKeyboardHeight(0);
          }
        }, 100);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', checkKeyboardHeight);
    } else {
      window.addEventListener('resize', checkKeyboardHeight);
    }

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', checkKeyboardHeight);
      } else {
        window.removeEventListener('resize', checkKeyboardHeight);
      }

      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return keyboardHeight;
};

export default useKeyboardDetector;
