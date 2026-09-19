import { useEffect, useState } from "react";

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

export function IsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1150);

  useEffect(() => {
    const isMounted = true;
    const timeoutDelay = 50;
    let timeoutId: NodeJS.Timeout;
    const resizeListener = () => {
      if (isMounted) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsLargeScreen(window.innerWidth >= 1150);
        }, timeoutDelay);
      }
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return isLargeScreen;
}