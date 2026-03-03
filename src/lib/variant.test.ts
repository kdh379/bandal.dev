import { describe, it, expect } from "vitest";

import { variants } from "./variant";

describe("variants", () => {
  describe("solid variant", () => {
    it("primary 변형에 올바른 클래스가 있어야 한다", () => {
      expect(variants.solid.primary).toBe("bg-primary text-primary-foreground");
    });

    it("foreground 변형에 올바른 클래스가 있어야 한다", () => {
      expect(variants.solid.foreground).toBe("bg-foreground text-background");
    });
  });

  describe("outline variant", () => {
    it("primary 변형에 올바른 클래스가 있어야 한다", () => {
      expect(variants.outline.primary).toBe("border-primary text-primary");
    });

    it("foreground 변형에 올바른 클래스가 있어야 한다", () => {
      expect(variants.outline.foreground).toBe(
        "border-foreground text-foreground",
      );
    });
  });

  describe("link variant", () => {
    it("primary 변형에 올바른 클래스가 있어야 한다", () => {
      expect(variants.link.primary).toBe("bg-transparent text-primary");
    });

    it("foreground 변형에 올바른 클래스가 있어야 한다", () => {
      expect(variants.link.foreground).toBe("bg-transparent text-foreground");
    });
  });

  describe("light variant", () => {
    it("primary 변형에 올바른 클래스가 있어야 한다", () => {
      expect(variants.light.primary).toBe("bg-transparent text-primary");
    });

    it("foreground 변형에 올바른 클래스가 있어야 한다", () => {
      expect(variants.light.foreground).toBe("bg-transparent text-foreground");
    });
  });

  it("네 가지 변형을 모두 내보내야 한다", () => {
    expect(Object.keys(variants)).toEqual([
      "solid",
      "outline",
      "link",
      "light",
    ]);
  });

  it("각 변형이 동일한 구조를 가져야 한다", () => {
    const variantKeys = ["primary", "foreground"];
    Object.values(variants).forEach((variant) => {
      expect(Object.keys(variant)).toEqual(variantKeys);
    });
  });
});
