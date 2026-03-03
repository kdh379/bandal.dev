import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useCursor } from "./useCursor";

describe("useCursor", () => {
  beforeEach(() => {
    // Mock ResizeObserver as a class
    class MockResizeObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    global.ResizeObserver = MockResizeObserver as any;
  });

  const createMockDOMRect = (
    rect: Omit<DOMRect, "toJSON" | "x" | "y">,
  ): DOMRect => ({
    ...rect,
    x: rect.left,
    y: rect.top,
    toJSON: () => ({ ...rect }),
  });

  it("기본 initialPx로 커서를 초기화해야 한다", () => {
    const { result } = renderHook(() =>
      useCursor("tab1", { selector: ".tab-item" }),
    );

    expect(result.current.cursorStyle).toEqual({
      width: 0,
      transform: "translateX(0px)",
    });
  });

  it("사용자 정의 initialPx로 커서를 초기화해야 한다", () => {
    const { result } = renderHook(() =>
      useCursor("tab1", { selector: ".tab-item", initialPx: 100 }),
    );

    expect(result.current.cursorStyle).toEqual({
      width: 0,
      transform: "translateX(100px)",
    });
  });

  it("initContainer 함수를 반환해야 한다", () => {
    const { result } = renderHook(() =>
      useCursor("tab1", { selector: ".tab-item" }),
    );

    expect(typeof result.current.initContainer).toBe("function");
  });

  it("enabled가 false일 때 커서 위치를 업데이트하지 않아야 한다", () => {
    const { result } = renderHook(() =>
      useCursor("tab1", { selector: ".tab-item", enabled: false }),
    );

    const mockContainer = document.createElement("div");
    const mockElement = document.createElement("div");
    mockElement.className = "tab-item";
    mockElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 100,
        left: 50,
        top: 0,
        height: 40,
        bottom: 40,
        right: 150,
      }),
    );
    mockContainer.querySelector = vi.fn(() => mockElement);
    mockContainer.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0,
      }),
    );

    act(() => {
      result.current.initContainer(mockContainer);
    });

    expect(result.current.cursorStyle.width).toBe(0);
  });

  it("selectedValue가 변경되면 커서 위치를 업데이트해야 한다", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useCursor(value, { selector: ".tab-item" }),
      { initialProps: { value: "tab1" } },
    );

    const mockContainer = document.createElement("div");
    const mockElement = document.createElement("div");
    mockElement.className = "tab-item";
    mockElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 100,
        left: 50,
        top: 0,
        height: 40,
        bottom: 40,
        right: 150,
      }),
    );
    mockContainer.querySelector = vi.fn(() => mockElement);
    mockContainer.querySelectorAll = vi.fn(() => [mockElement] as any);
    mockContainer.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0,
      }),
    );

    act(() => {
      result.current.initContainer(mockContainer);
    });

    expect(result.current.cursorStyle.width).toBe(100);

    // Rerender with new selectedValue
    rerender({ value: "tab2" });
  });

  it("skipAnimation 옵션을 처리해야 한다", () => {
    const skipAnimationFn = vi.fn((_, current) => current === "tab3");
    const { result } = renderHook(() =>
      useCursor("tab2", {
        selector: ".tab-item",
        skipAnimation: skipAnimationFn,
      }),
    );

    const mockContainer = document.createElement("div");
    const mockElement = document.createElement("div");
    mockElement.className = "tab-item";
    mockElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 100,
        left: 50,
        top: 0,
        height: 40,
        bottom: 40,
        right: 150,
      }),
    );
    mockContainer.querySelector = vi.fn(() => mockElement);
    mockContainer.querySelectorAll = vi.fn(() => [mockElement] as any);
    mockContainer.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0,
      }),
    );

    act(() => {
      result.current.initContainer(mockContainer);
    });

    // Should call skipAnimation with previous value and current value
    expect(skipAnimationFn).toHaveBeenCalledWith(null, "tab2");
  });

  it("null 컨테이너를 정상적으로 처리해야 한다", () => {
    const { result } = renderHook(() =>
      useCursor("tab1", { selector: ".tab-item" }),
    );

    act(() => {
      result.current.initContainer(null);
    });

    // Should not throw any error
    expect(result.current.cursorStyle).toEqual({
      width: 0,
      transform: "translateX(0px)",
    });
  });

  it("컨테이너에 상대적인 올바른 커서 위치를 계산해야 한다", () => {
    const { result } = renderHook(() =>
      useCursor("tab1", { selector: ".tab-item" }),
    );

    const mockContainer = document.createElement("div");
    const mockElement = document.createElement("div");
    mockElement.className = "tab-item";
    mockElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 120,
        left: 200,
        top: 0,
        height: 40,
        bottom: 40,
        right: 320,
      }),
    );
    mockContainer.querySelector = vi.fn(() => mockElement);
    mockContainer.querySelectorAll = vi.fn(() => [mockElement] as any);
    mockContainer.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        left: 50,
        top: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0,
      }),
    );

    act(() => {
      result.current.initContainer(mockContainer);
    });

    expect(result.current.cursorStyle.width).toBe(120);
    expect(result.current.cursorStyle.transform).toBe("translateX(150px)"); // 200 - 50
  });

  it("올바른 속성을 가진 cursorStyle 객체를 반환해야 한다", () => {
    const { result } = renderHook(() =>
      useCursor("tab1", { selector: ".tab-item" }),
    );

    expect(result.current.cursorStyle).toHaveProperty("width");
    expect(result.current.cursorStyle).toHaveProperty("transform");
  });
});
