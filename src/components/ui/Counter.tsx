import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import React from "react";

export default function Counter({
  value,
  direction = "up",
  formatAsPercentage = false,
}: {
  value: number;
  direction?: "up" | "down";
  formatAsPercentage?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 100,
  });

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = formatAsPercentage
            ? `${Intl.NumberFormat("en-US").format(latest.toFixed(0))}%`
            : Intl.NumberFormat("en-US").format(latest.toFixed(0));
        }
      }),
    [springValue, formatAsPercentage]
  );

  return <span ref={ref} />;
}
