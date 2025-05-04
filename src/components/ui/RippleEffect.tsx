import React from "react";

import type { RippleProps } from "@/hooks/useRipple";

interface RippleEffectProps {
  ripples: RippleProps[];
}

export function RippleEffect({ ripples }: RippleEffectProps) {
  return (
    <>
      {ripples.map((ripple, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </>
  );
}
