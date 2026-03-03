import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { RippleEffect } from "./RippleEffect";

describe("RippleEffect", () => {
  it("ripples 배열이 비어있으면 아무것도 렌더링하지 않아야 한다", () => {
    const { container } = render(<RippleEffect ripples={[]} />);
    expect(container.querySelector("span")).not.toBeInTheDocument();
  });

  it("단일 리플을 렌더링해야 한다", () => {
    const { container } = render(
      <RippleEffect ripples={[{ x: 50, y: 25, size: 100 }]} />,
    );

    const ripple = container.querySelector("span");
    expect(ripple).toBeInTheDocument();
    expect(ripple).toHaveClass(
      "absolute",
      "rounded-full",
      "bg-white/30",
      "animate-ripple",
      "pointer-events-none",
    );
  });

  it("여러 리플을 렌더링해야 한다", () => {
    const { container } = render(
      <RippleEffect
        ripples={[
          { x: 50, y: 25, size: 100 },
          { x: 100, y: 50, size: 150 },
          { x: 25, y: 75, size: 200 },
        ]}
      />,
    );

    const ripples = container.querySelectorAll("span");
    expect(ripples).toHaveLength(3);
  });

  it("리플에 올바른 스타일을 적용해야 한다", () => {
    const { container } = render(
      <RippleEffect ripples={[{ x: 50, y: 25, size: 100 }]} />,
    );

    const ripple = container.querySelector("span");
    expect(ripple).toHaveStyle({
      left: "0px", // x - size/2 = 50 - 50
      top: "-25px", // y - size/2 = 25 - 50
      width: "100px",
      height: "100px",
    });
  });

  it("콘솔 경고 없이 리플을 렌더링해야 한다", () => {
    const spy = vi.spyOn(console, "error");
    render(
      <RippleEffect
        ripples={[
          { x: 50, y: 25, size: 100 },
          { x: 100, y: 50, size: 150 },
        ]}
      />,
    );
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
