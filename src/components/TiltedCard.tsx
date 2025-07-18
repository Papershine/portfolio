import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./TiltedCard.css";

interface TiltedCardProps {
  imageSrc: string,
  altText: string,
  link: string,
  children: React.ReactNode
}

export default function TiltedCard({
  imageSrc,
  altText,
  link,
  children,
}: TiltedCardProps) {
  const scaleOnHover = 1.05;
  const rotateAmplitude = 16;
  const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2,
  };

  const ref = useRef<HTMLElement | null>(null);

  const x = useMotionValue<number | null>(null);
  const y = useMotionValue<number | null>(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure cursor-pointer w-3xl"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(link, '_blank')}
    >
      <motion.div
        className="tilted-card-inner w-full h-80 md:h-108 rounded-xl bg-white/30 dark:bg-gray-950/30 border-gray-300 dark:border-gray-700 border-1"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img w-full h-80 md:h-108 rounded-xl object-center object-cover fade-bottom"
        />
        <motion.div className="tilted-card-overlay absolute z-10 bottom-0 left-0 right-0 my-6 mx-10 will-change-[backdrop-filter,opacity]">
          {children}
        </motion.div>
      </motion.div>
    </figure>
  );
}
