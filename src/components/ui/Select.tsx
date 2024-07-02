"use client";

import * as React from "react";
import { createContext, FC, ReactNode, useContext } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@acme/ui/lib/utils";

const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// #region SelectSizeContex
export type SelectSize = "xs" | "sm" | "md" | "lg";

type SelectSizeContextProps = { size: SelectSize };
const SelectSizeContext = createContext<SelectSizeContextProps>({ size: "md" });

type SelectSizeProviderProps = { children: ReactNode; size: SelectSize };
const SelectSizeProvider: FC<SelectSizeProviderProps> = ({
  children,
  size,
}) => (
  <SelectSizeContext.Provider value={{ size }}>
    {children}
  </SelectSizeContext.Provider>
);
const useSelectSize = () => useContext(SelectSizeContext);
// #endregion SelectSizeContex

// #region SelectRoot
type SelectRootProps = { size?: SelectSize } & SelectPrimitive.SelectProps;
const Select: FC<SelectRootProps> = ({ size = "md", children, ...props }) => {
  return (
    <SelectSizeProvider size={size}>
      <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
    </SelectSizeProvider>
  );
};
Select.displayName = SelectPrimitive.Root.displayName;
// #endregion SelectRoot

/* TODO: Check the "invalid" state. Not sure where to place it */

// #region SelectTrigger */
type SelectTriggerRef = React.ElementRef<typeof SelectPrimitive.Trigger>;

export type SelectTriggerVariantProps = Omit<
  VariantProps<typeof selectTriggerVariants>,
  "size"
>;
type SelectTriggerBaseProps = {} & SelectTriggerVariantProps;
export type SelectTriggerProps = SelectTriggerBaseProps &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;

export const selectTriggerVariants = cva(
  cn(
    "peer appearance-none bg-white transition focus-visible:outline-none",
    "flex w-full items-center justify-between gap-2",
    "rounded-lg border",
    "focus-within:ring-3 data-[state=open]:ring-3",
    "shadow-[0_1px_2px_0_theme(colors.neutral.900/6%)]",
    "disabled:pointer-events-none disabled:border-gray-200 disabled:bg-gray-50",
    "data-[placeholder]:text-gray-400",
    "text-nowrap",
    "[&>#chevron]:data-[state=open]:rotate-180 [&>#chevron]:data-[state=open]:text-neutral-900"
  ),
  {
    variants: {
      size: {
        xs: "px-[calc(theme(spacing[3])-1px)] py-[calc(theme(spacing[2])-1px)] text-sm",
        sm: "px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-sm",
        md: "px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[3])-1px)] text-sm",
        lg: "px-[calc(theme(spacing[4])-1px)] py-[calc(theme(spacing[3])-1px)] text-base",
      },
      invalid: {
        true: cn(
          "border-error-600",
          "focus-within:border-error-600 focus-within:ring-error-600/[.24]",
          "hover:border-error-600 hover:ring-error-600/[.24]"
        ),
        false: cn(
          "border-neutral-200",
          "focus-within:border-primary-500 focus-within:ring-primary-600/[.24]",
          "data-[state=open]:border-primary-500 data-[state=open]:ring-primary-600/[.24]",
          "hover:border-primary-500"
        ),
      },
    },
    defaultVariants: {
      size: "md",
      invalid: false,
    },
  }
);

const SelectTrigger = React.forwardRef<SelectTriggerRef, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useSelectSize();

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(selectTriggerVariants({ size }), className)}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            id="chevron"
            className="h-4 w-4 shrink-0 text-gray-500 transition"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
// #endregion SelectTrigger */

// #region TODO - SelectScrollUpButton
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
// #endregion TODO - SelectScrollUpButton

// #region TODO - SelectScrollDownButton
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;
// #endregion TODO - SelectScrollDownButton

// #region SelectContent
type SelectContentRef = React.ElementRef<typeof SelectPrimitive.Content>;

export type SelectContentVariantProps = VariantProps<
  typeof selectContentVariants
>;
type SelectContentBaseProps = {} & SelectContentVariantProps;
export type SelectContentProps = SelectContentBaseProps &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

export const selectContentVariants = cva(
  cn(
    "border border-neutral-200",
    "relative z-50 overflow-hidden rounded-lg border bg-white text-neutral-900 shadow-md",
    "w-full min-w-[var(--radix-select-trigger-width)]",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
  )
);

const SelectContent = React.forwardRef<SelectContentRef, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          selectContentVariants({}),
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "px-[calc(theme(spacing[1.5])-1px)] py-[calc(theme(spacing[1.5])-1px)]",
            "space-y-0.5",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;
// #endregion SelectContent

// #region SelectLabel
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
// #endregion SelectLabel

// #region SelectItem
type SelectItemRef = React.ElementRef<typeof SelectPrimitive.Item>;

export type SelectItemVariantProps = Omit<
  VariantProps<typeof selectItemVariants>,
  "size"
>;
type SelectItemBaseProps = { startIcon?: JSX.Element } & SelectItemVariantProps;
export type SelectItemProps = SelectItemBaseProps &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

export const selectItemVariants = cva(
  cn(
    "relative flex w-full cursor-default select-none items-center outline-none transition",
    "rounded-md",
    "focus:bg-neutral-50",
    "data-[state=checked]:bg-primary-50 data-[state=checked]:text-primary-500",
    "data-[disabled]:pointer-events-none data-[disabled]:text-gray-400"
  ),
  {
    variants: {
      size: {
        xs: "h-9 px-2 pr-8 text-sm",
        sm: "h-10 px-2 pr-8 text-sm",
        md: "h-11 px-2.5 pr-[34px] text-sm",
        lg: "h-11 px-3 pr-10 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
const SelectItem = React.forwardRef<SelectItemRef, SelectItemProps>(
  ({ startIcon, className, children, ...props }, ref) => {
    const { size } = useSelectSize();

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(selectItemVariants({ size }), className)}
        {...props}
      >
        <SelectItemIndicator />
        <SelectItemText startIcon={startIcon}>{children}</SelectItemText>
      </SelectPrimitive.Item>
    );
  }
);
SelectItem.displayName = SelectPrimitive.Item.displayName;
// #endregion SelectItem

// #region SelectItemText
type SelectItemTextRef = React.ElementRef<typeof SelectPrimitive.ItemText>;

type SelectItemTextVariantProps = Omit<
  VariantProps<typeof selectItemTextVariants>,
  "size"
>;
type SelectItemTextBaseProps = {
  startIcon?: JSX.Element;
} & SelectItemTextVariantProps;
export type SelectItemTextProps = SelectItemTextBaseProps &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>;

const selectItemTextVariants = cva("flex items-center", {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const SelectItemText = React.forwardRef<SelectItemTextRef, SelectItemTextProps>(
  ({ startIcon, className, children, ...props }, ref) => {
    const { size } = useSelectSize();
    return (
      <SelectPrimitive.ItemText asChild ref={ref} {...props}>
        <span className={cn(selectItemTextVariants({ size }), className)}>
          {startIcon && <SelectItemIcon children={startIcon} />}
          <span>{children}</span>
        </span>
      </SelectPrimitive.ItemText>
    );
  }
);
SelectItemText.displayName = SelectPrimitive.ItemText.displayName;
// #endregion SelectItemText

// #region SelectItemIcon
const selectItemIconVariants = cva(
  "shrink-0 stroke-[1.5px] transition-colors",
  {
    variants: {
      size: {
        xs: "mr-2 size-4",
        sm: "mr-2 size-4",
        md: "mr-2 size-4",
        lg: "mr-2 size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const SelectItemIcon = React.forwardRef<HTMLElement, SlotProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useSelectSize();
    return (
      <Slot
        ref={ref}
        id="icon"
        aria-hidden
        className={cn(
          selectItemIconVariants({ size }),
          "size-4 shrink-0  ",
          className
        )}
        {...props}
      >
        {children}
      </Slot>
    );
  }
);
SelectItemIcon.displayName = "SelectItemIcon";
// #endregion SelectItemIcon

// #region SelectItemIndicator
type SelectItemIndicatorRef = React.ElementRef<
  typeof SelectPrimitive.ItemIndicator
>;

export type SelectItemIndicatorVariantProps = Omit<
  VariantProps<typeof selectItemIndicatorVariants>,
  "size"
>;
type SelectItemIndicatorBaseProps = {} & SelectItemIndicatorVariantProps;
export type SelectItemIndicatorProps = SelectItemIndicatorBaseProps &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>;

export const selectItemIndicatorVariants = cva(cn("absolute"), {
  variants: {
    size: {
      xs: "right-2 top-2.5 [&>svg]:size-4",
      sm: "right-2 top-3 [&>svg]:size-4",
      md: "right-2.5 top-3.5 [&>svg]:size-4",
      lg: "right-3 top-3 [&>svg]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
const SelectItemIndicator = React.forwardRef<
  SelectItemIndicatorRef,
  SelectItemIndicatorProps
>(({ className, children, ...props }, ref) => {
  const { size } = useSelectSize();

  return (
    <SelectPrimitive.ItemIndicator
      ref={ref}
      className={cn(selectItemIndicatorVariants({ size }), className)}
      {...props}
    >
      <Check />
    </SelectPrimitive.ItemIndicator>
  );
});
SelectItemIndicator.displayName = SelectPrimitive.ItemIndicator.displayName;
// #endregion SelectItemIndicator

// #region SelectSeparator
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("h-px bg-neutral-200", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
// #endregion SelectSeparator

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
