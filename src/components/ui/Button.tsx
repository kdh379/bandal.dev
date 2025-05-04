import { tv } from "tailwind-variants";

import { RippleEffect } from "@/components/ui/RippleEffect";
import { useRipple } from "@/hooks/useRipple";
import { variants } from "@/lib/variant";

import type { VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "relative inline-flex items-center justify-center whitespace-nowrap transition overflow-hidden",
  variants: {
    variant: {
      solid: "",
      outline: "border bg-transparent",
      link: "underline-offset-4 hover:underline",
    },
    color: {
      primary: "",
      secondary: "",
    },
    size: {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
    isDisabled: {
      true: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    isIconOnly: {
      true: "px-0 gap-0",
      false: "[&>svg]:ml-2",
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
    radius: "md",
    isIconOnly: false,
    isDisabled: false,
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      className: variants.solid.primary,
    },
    {
      variant: "solid",
      color: "secondary",
      className: variants.solid.secondary,
    },
    {
      variant: "outline",
      color: "primary",
      className: variants.outline.primary,
    },
    {
      variant: "outline",
      color: "secondary",
      className: variants.outline.secondary,
    },
    {
      variant: "link",
      color: "primary",
      className: variants.link.primary,
    },
    {
      variant: "link",
      color: "secondary",
      className: variants.link.secondary,
    },
    // Icon Only
    {
      isIconOnly: true,
      size: "sm",
      class: "min-w-8 w-8 h-8",
    },
    {
      isIconOnly: true,
      size: "md",
      class: "min-w-10 w-10 h-10",
    },
    {
      isIconOnly: true,
      size: "lg",
      class: "min-w-12 w-12 h-12",
    },
    // hover
    {
      variant: ["solid", "outline"],
      class: "hover:opacity-80",
    },
  ],
});

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  color,
  size,
  variant = "solid",
  ...rest
}: ButtonProps) {
  const { ripples, addRipple, containerRef } = useRipple();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "solid") {
      addRipple(e);
    }

    rest.onClick?.(e);
  };

  return (
    <button
      ref={containerRef as React.RefObject<HTMLButtonElement>}
      className={buttonVariants({ color, size, variant, className })}
      onClick={handleClick}
      {...rest}
    >
      {rest.children}
      {variant === "solid" && <RippleEffect ripples={ripples} />}
    </button>
  );
}

export { Button, buttonVariants };
