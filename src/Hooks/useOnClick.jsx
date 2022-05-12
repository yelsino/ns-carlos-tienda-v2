import { useEffect, useState } from 'react';

export const useOnClick = (time = 0) => {
  const [click, setClick] = useState(false);

  useEffect(() => {
   
    const timeout = setTimeout(() => {
        setClick(false);
      // solo se renderiza 1 vez
    }, time);

    return () => clearTimeout(timeout);
  }, [click]);

  return [click,
    setClick,];
};
