import { RefObject, useEffect } from 'react';

interface Props {
  ref: RefObject<HTMLElement>;
  callback: (event: MouseEvent) => void;
}

const useClickOutside = ({ ref, callback }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
