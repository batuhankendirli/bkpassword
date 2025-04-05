import { useEffect, RefObject } from 'react';

/**
 * Hook to lock scrolling when a component is focused
 */
const useScrollLock = (isFocused: boolean, containerRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    let originalContainerOverflow = '';

    const preventTouchMove = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea')) return;
      e.preventDefault();
    };

    if (containerRef.current) {
      originalContainerOverflow = containerRef.current.style.overflowY || 'auto';
    }

    if (isFocused) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      if (containerRef.current) {
        containerRef.current.style.overflowY = 'hidden';
      }

      document.addEventListener('touchmove', preventTouchMove, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      if (containerRef.current) {
        containerRef.current.style.overflowY = 'auto';
      }

      document.removeEventListener('touchmove', preventTouchMove);
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;

      if (containerRef.current) {
        containerRef.current.style.overflowY = originalContainerOverflow;
      }

      document.removeEventListener('touchmove', preventTouchMove);
    };
  }, [isFocused, containerRef]);
};

export default useScrollLock;
