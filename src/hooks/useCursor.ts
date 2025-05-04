import { useCallback, useEffect, useRef, useState } from "react";

interface CursorStyle {
  width: number;
  transform: string;
  transition?: string;
}

interface UseCursorOptions {
  /** 커서 기능 활성화 여부 */
  enabled?: boolean;
  /** 선택된 요소의 selector */
  selector: string;
  /** 초기 px 위치 */
  initialPx?: number;
  /** 애니메이션 스킵 여부를 확인하는 함수 */
  skipAnimation?: (prev: unknown, current: unknown) => boolean;
}

export const useCursor = <T>(selectedValue: T, options: UseCursorOptions) => {
  const { enabled = true, selector, skipAnimation, initialPx = 0 } = options;
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>({
    width: 0,
    transform: `translateX(${initialPx}px)`,
  });
  const observerRef = useRef<ResizeObserver | null>(null);
  const previousValueRef = useRef<T>(null);
  const skipAnimationRef = useRef(skipAnimation);

  // skipAnimation 함수가 변경될 때마다 ref 업데이트
  useEffect(() => {
    skipAnimationRef.current = skipAnimation;
  }, [skipAnimation]);

  const updateCursorPosition = useCallback(
    (container: HTMLElement, skipTransition = false) => {
      const selectedElement = container.querySelector(selector);
      if (!selectedElement) return;

      const elementRect = selectedElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setCursorStyle({
        width: elementRect.width,
        transform: `translateX(${elementRect.left - containerRect.left}px)`,
        transition: skipTransition ? "none" : "transform 0.2s ease",
      });
    },
    [selector],
  );

  useEffect(() => {
    if (!enabled) return;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [enabled]);

  const initContainer = useCallback(
    (container: HTMLElement | null) => {
      if (!container || !enabled) return;

      // 이전 observer 정리
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new ResizeObserver(() => {
        updateCursorPosition(container);
      });

      // 모든 대상 요소를 관찰
      container.querySelectorAll(selector).forEach((element) => {
        observerRef.current?.observe(element);
      });

      // 초기 위치 설정
      const shouldSkipAnimation = skipAnimationRef.current?.(
        previousValueRef.current,
        selectedValue,
      );
      updateCursorPosition(container, shouldSkipAnimation);
      previousValueRef.current = selectedValue;
    },
    [enabled, selector, selectedValue, updateCursorPosition],
  );

  return {
    cursorStyle,
    initContainer,
  };
};
