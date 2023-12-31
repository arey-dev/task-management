import { useState, useEffect } from "react";

// Define the breakpoints for different screen sizes
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Create a custom hook that returns the current screen size
export function useScreenSize() {
  // Get the initial window width
  // *********change innerWidth to clientWidth**********
  const [width, setWidth] = useState(window.innerWidth);

  // Define a function that updates the width state on window resize
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  // Add an event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Remove the event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return the screen size based on the breakpoints
  if (width < breakpoints.sm) {
    return "xs";
  } else if (width < breakpoints.md) {
    return "sm";
  } else if (width < breakpoints.lg) {
    return "md";
  } else if (width < breakpoints.xl) {
    return "lg";
  } else {
    return "xl";
  }
}
