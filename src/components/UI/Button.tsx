"use client";

import { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

const buttonVariance = cva("shadow-md rounded-md px-4 py-2 active:scale-90 transition-transform ease-in-out", {
  variants: {
    size: {
      default: "",
      medium: "text-lg"
    },
    colorScheme: {
      default: "",
      primaryOrange: "text-primaryBrown bg-primaryOrange font-semibold",
      inversePrimaryOrange: "text-primaryOrange bg-primaryBrown font-bold",
      inputField: "bg-orange-200 text-primaryOrange font-bold",
    },
  },
  defaultVariants: {
    size: "default",
    colorScheme: "default",
  },
});

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariance> {
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({
  size,
  colorScheme,
  className,
  children,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        clsx(buttonVariance({ size, colorScheme, className }))
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
