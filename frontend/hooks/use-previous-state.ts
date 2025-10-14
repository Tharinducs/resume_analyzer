import { useEffect, useRef } from "react";

// Custom hook to store the previous state value
export const usePreviousState = (value: any) => {
  const ref = useRef<any>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}