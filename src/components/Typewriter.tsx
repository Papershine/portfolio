import { motion, type Target } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TargetValue = string | number

function buildKeyframes(from: Target, steps: Target[]) {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, TargetValue[]> = {};
  keys.forEach((k) => {
    const key = k as keyof Target
    keyframes[key] = [from[key], ...steps.map((s) => s[key])].filter(v => v !== undefined) as TargetValue[];
  });
  return keyframes;
}

export default function Typewriter({ text }: { text: string }) {
  const delay = 200;
  const threshold = 0.1;
  const rootMargin = "0px";
  const stepDuration = 0.35;

  const elements = text.split(" ");
  const [inView, setInView] = useState(false);
  const ref = useRef<null | HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const fromSnapshot = { filter: "blur(10px)", opacity: 0, y: -50 };

  const toSnapshots = [
    {
      filter: "blur(5px)",
      opacity: 0.5,
      y: 5,
    },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ];

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p ref={ref} className={`blur-text flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={() =>
              document.body.classList.remove("fade-blocked")
            }
          >
            {segment === " " ? "\u00A0" : segment}
            {index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
}
