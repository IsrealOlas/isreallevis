import { useState, useEffect, useCallback, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0, y: 0, normalizedX: 0, normalizedY: 0
  });
  const rafRef = useRef<number>(0);
  const latestRef = useRef<MousePosition>({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    latestRef.current = {
      x: e.clientX,
      y: e.clientY,
      normalizedX: (e.clientX / window.innerWidth - 0.5) * 2,
      normalizedY: (e.clientY / window.innerHeight - 0.5) * 2,
    };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition(latestRef.current);
        rafRef.current = 0;
      });
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return mousePosition;
};
