"use client";

import { useState, useRef, useCallback } from "react";

// 리플 효과를 위한 인터페이스 정의
export interface RippleProps {
  x: number;
  y: number;
  size: number;
}

export function useRipple(duration = 600) {
  const [ripples, setRipples] = useState<RippleProps[]>([]);
  const containerRef = useRef<HTMLElement>(null);

  const addRipple = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // 버튼의 대각선 길이 계산 (리플이 버튼을 완전히 덮기 위함)
      const size = Math.max(rect.width, rect.height) * 2;

      // 새로운 리플 추가
      const newRipple = { x, y, size };
      setRipples((prev) => [...prev, newRipple]);

      // 애니메이션 완료 후 리플 제거
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple !== newRipple));
      }, duration);
    },
    [duration],
  );

  return {
    ripples,
    addRipple,
    containerRef,
  };
}
