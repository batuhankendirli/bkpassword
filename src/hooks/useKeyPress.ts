import { useEffect } from 'react';

interface Props {
  targetKey: string;
  callback: () => void;
}

const useKeyPress = ({ targetKey, callback }: Props) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetKey, callback]);
};

export default useKeyPress;
