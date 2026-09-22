import { useEffect, useState } from "react";

export function IsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = useState(
    () => window.innerWidth >= 1150
  );

  useEffect(() => {
    const resizeListener = () => {
      setIsLargeScreen(window.innerWidth >= 1150);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return isLargeScreen;
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}