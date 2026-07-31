import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold tracking-tight transition-[background,color,border-color,transform,filter] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-cyan-400 to-emerald-300 text-[#04110f] shadow-[0_10px_30px_rgba(34,211,238,0.12)] hover:-translate-y-0.5 hover:brightness-110",
        secondary:
          "border border-white/[0.13] bg-white/[0.025] text-white hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.055]",
        ghost: "text-zinc-300 hover:bg-white/[0.06] hover:text-white",
        danger:
          "border border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/20",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
