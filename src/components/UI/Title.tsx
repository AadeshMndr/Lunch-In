import { HTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

const titleVariance = cva("font-bold font-bubblegum text-center drop-shadow-sm cursor-default", {
  variants: {
    size: {
      default: "",
      small: "",
      large: "text-5xl",
      medium: "text-xl",
      lessThanLarge: "text-4xl",
    },
    colorScheme: {
      black: "text-black",
      primary: "text-primaryOrange"
    },
    spaceScheme: {
      default: "",
      spaceBelow: "mb-5",
      spaceAbove: "mt-5",
    },
  },
  defaultVariants: {
    size: "default",
    colorScheme: "black",
    spaceScheme: "default",
  },
});

interface Props
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariance> {}

const Title: React.FC<Props> = ({
  size,
  colorScheme,
  spaceScheme,
  className,
  children,
  ...props
}) => {
  return (
    <h1
      className={twMerge(clsx(titleVariance({ size, colorScheme, spaceScheme, className })))}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Title;
