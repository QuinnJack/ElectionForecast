"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// #region SwitchRoot
type SwitchRef = React.ElementRef<typeof SwitchPrimitives.Root>;

export type SwitchVariantProps = VariantProps<typeof switchVariants>;
type SwitchBaseProps = {} & SwitchVariantProps;
export type SwitchProps = SwitchBaseProps &
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

export const switchVariants = cva(
  cn(
    "peer relative inline-flex shrink-0 cursor-pointer items-center transition",
    "rounded-full border-none",
    "disabled:pointer-events-none",
    "focus-within:ring-3 focus-within:ring-primary-600/[.24] focus-visible:outline-none",

    // Checked State
    // Checked - Background
    "data-[state=checked]:bg-primary-600 data-[state=checked]:hover:bg-primary-700",

    // Checked - Radial gradient
    "data-[state=checked]:after:absolute data-[state=checked]:after:inset-[1px] data-[state=checked]:after:rounded-[calc(theme(borderRadius.full)-1px)]",
    "data-[state=checked]:after:bg-[radial-gradient(100%_100%_at_50%_0%,_theme(colors.white/16%)_0%,_theme(colors.white/0%)_100%)]",

    // Checked - Serves as the inner border
    "data-[state=checked]:before:absolute data-[state=checked]:before:inset-0 data-[state=checked]:before:rounded-full data-[state=checked]:before:transition",
    "data-[state=checked]:before:shadow-[inset_0_0_0_1px_theme(colors.primary.600/100%)]",
    "data-[state=checked]:hover:before:shadow-[inset_0_0_0_1px_theme(colors.primary.700/100%)]",

    // Checked - Shadows
    // 1st shadow: Adds depth around the button
    // 2nd shadow: Adds a small white line at the top for depth
    // 3rd shadow: Adds a small black line at the bottom for depth
    "data-[state=checked]:shadow-[shadow:theme(boxShadow.xs),_inset_0_1px_0.5px_0.5px_theme(colors.white/44%),_inset_0_-1px_2px_theme(colors.primary.800/50%)]",

    // Checked - Disabled
    "data-[state=checked]:disabled:bg-neutral-50",
    "data-[state=checked]:disabled:before:!content-none",
    "data-[state=checked]:disabled:after:!content-none",
    "data-[state=checked]:disabled:shadow-[inset_0_1px_2px_theme(colors.neutral.900/6%)]",

    // Unchecked State
    // Unchecked - Background
    "data-[state=unchecked]:bg-gradient-to-b data-[state=unchecked]:from-neutral-100 data-[state=unchecked]:to-neutral-200",
    "data-[state=unchecked]:hover:to-neutral-300",

    // Unchecked - Shadows
    "data-[state=unchecked]:shadow-[inset_0_1px_2px_theme(colors.neutral.900/12%)]",

    // Uncheck - Disabled
    "data-[state=unchecked]:disabled:from-neutral-50 data-[state=unchecked]:disabled:to-neutral-50"
  ),
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const Switch = React.forwardRef<SwitchRef, SwitchProps>(
  ({ size, className, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ size }), className)}
      {...props}
      ref={ref}
    >
      <SwitchThumb size={size} />
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;
// #endregion SwitchRoot

// #region SwitchThumb
type SwitchThumbRef = React.ElementRef<typeof SwitchPrimitives.Thumb>;

type SwitchThumbVariantProps = VariantProps<typeof switchThumbVariants>;
type SwitchThumbBaseProps = {} & SwitchThumbVariantProps;
export type SwitchThumbProps = SwitchThumbBaseProps &
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Thumb>;

export const switchThumbVariants = cva(
  cn(
    "pointer-events-none block rounded-full bg-white transition",
    "data-[state=checked]:shadow-[0_1px_2px_0_theme(colors.neutral.900/12%),_inset_0_-1px_0.5px_theme(colors.neutral.900/12%)]",
    "data-[state=unchecked]:shadow-[0_1px_2px_0_theme(colors.neutral.900/12%),_inset_0_-1px_0.5px_theme(colors.neutral.900/5%)]",
    "data-[disabled]:shadow-[0_1px_2px_0_theme(colors.neutral.900/12%),_inset_0_-1px_0.5px_theme(colors.neutral.900/5%)]"
  ),
  {
    variants: {
      size: {
        sm: "size-3 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1",
        md: "size-4 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const SwitchThumb = React.forwardRef<SwitchThumbRef, SwitchThumbProps>(
  ({ size, className, ...props }, ref) => (
    <SwitchPrimitives.Thumb
      className={cn(switchThumbVariants({ size }), className)}
      {...props}
      ref={ref}
    />
  )
);
SwitchThumb.displayName = SwitchPrimitives.Thumb.displayName;
// #endregion SwitchThumb

export { Switch };
