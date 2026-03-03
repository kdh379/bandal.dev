import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { useRipple } from "./useRipple";

describe("useRipple", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("빈 ripples 배열로 초기화해야 한다", () => {
    const { result } = renderHook(() => useRipple());
    expect(result.current.ripples).toEqual([]);
  });

  it("클릭 시 리플을 추가해야 한다", () => {
    const { result } = renderHook(() => useRipple(600));

    const mockElement = {
      getBoundingClientRect: vi.fn(() => ({
        width: 100,
        height: 50,
        left: 0,
        top: 0,
      })),
    } as unknown as HTMLElement;

    result.current.containerRef.current = mockElement;

    act(() => {
      result.current.addRipple({
        clientX: 50,
        clientY: 25,
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.ripples).toHaveLength(1);
    expect(result.current.ripples[0]).toEqual({
      x: 50,
      y: 25,
      size: 200, // max(100, 50) * 2
    });
  });

  it("duration 후 리플을 제거해야 한다", () => {
    const { result } = renderHook(() => useRipple(600));

    const mockElement = {
      getBoundingClientRect: vi.fn(() => ({
        width: 100,
        height: 50,
        left: 0,
        top: 0,
      })),
    } as unknown as HTMLElement;

    result.current.containerRef.current = mockElement;

    act(() => {
      result.current.addRipple({
        clientX: 50,
        clientY: 25,
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.ripples).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(result.current.ripples).toHaveLength(0);
  });

  it("여러 리플을 처리해야 한다", () => {
    const { result } = renderHook(() => useRipple(600));

    const mockElement = {
      getBoundingClientRect: vi.fn(() => ({
        width: 100,
        height: 50,
        left: 0,
        top: 0,
      })),
    } as unknown as HTMLElement;

    result.current.containerRef.current = mockElement;

    act(() => {
      result.current.addRipple({
        clientX: 10,
        clientY: 10,
      } as React.MouseEvent<HTMLElement>);
    });

    act(() => {
      result.current.addRipple({
        clientX: 90,
        clientY: 40,
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.ripples).toHaveLength(2);
  });

  it("containerRef가 null이면 리플을 추가하지 않아야 한다", () => {
    const { result } = renderHook(() => useRipple(600));

    act(() => {
      result.current.addRipple({
        clientX: 50,
        clientY: 25,
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.ripples).toHaveLength(0);
  });

  it("컨테이너 크기에 따라 올바른 리플 크기를 계산해야 한다", () => {
    const { result } = renderHook(() => useRipple(600));

    // Test with wide container
    const wideElement = {
      getBoundingClientRect: vi.fn(() => ({
        width: 200,
        height: 50,
        left: 0,
        top: 0,
      })),
    } as unknown as HTMLElement;

    result.current.containerRef.current = wideElement;

    act(() => {
      result.current.addRipple({
        clientX: 100,
        clientY: 25,
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.ripples[0].size).toBe(400); // max(200, 50) * 2

    // Test with tall container
    const tallElement = {
      getBoundingClientRect: vi.fn(() => ({
        width: 50,
        height: 200,
        left: 0,
        top: 0,
      })),
    } as unknown as HTMLElement;

    result.current.containerRef.current = tallElement;

    act(() => {
      result.current.addRipple({
        clientX: 25,
        clientY: 100,
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.ripples[1].size).toBe(400); // max(50, 200) * 2
  });

  it("컨테이너에 상대적인 올바른 리플 위치를 계산해야 한다", () => {
    const { result } = renderHook(() => useRipple(600));

    const mockElement = {
      getBoundingClientRect: vi.fn(() => ({
        width: 100,
        height: 50,
        left: 50,
        top: 100,
      })),
    } as unknown as HTMLElement;

    result.current.containerRef.current = mockElement;

    act(() => {
      result.current.addRipple({
        clientX: 150,
        clientY: 150,
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.ripples[0].x).toBe(100); // 150 - 50
    expect(result.current.ripples[0].y).toBe(50); // 150 - 100
  });

  it("사용자 정의 duration을 사용해야 한다", () => {
    const { result } = renderHook(() => useRipple(300));

    const mockElement = {
      getBoundingClientRect: vi.fn(() => ({
        width: 100,
        height: 50,
        left: 0,
        top: 0,
      })),
    } as unknown as HTMLElement;

    result.current.containerRef.current = mockElement;

    act(() => {
      result.current.addRipple({
        clientX: 50,
        clientY: 25,
      } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.ripples).toHaveLength(1);

    // Advance time to just before duration
    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(result.current.ripples).toHaveLength(1);

    // Advance time past duration
    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current.ripples).toHaveLength(0);
  });
});
