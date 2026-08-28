import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Component>
  );
}
