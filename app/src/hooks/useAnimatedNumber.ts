import { useState, useEffect, useRef } from "react";

export function useAnimatedNumber(target: number, delay = 0, duration = 900): number {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  // Keep ref in sync with the latest rendered value so the next animation
  // always starts from the current displayed number, preventing jumps
  // when the target changes while a previous animation is still running.
  useEffect(() => {
    valueRef.current = value;
  });

  useEffect(() => {
    const startValue = valueRef.current;
    let rafId = 0;
    const timeout = window.setTimeout(() => {
      const started = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(startValue + (target - startValue) * eased));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, delay, duration]);

  return value;
}
