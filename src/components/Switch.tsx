import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React from "react";

const switchClasses = cva("", {
  variants: {
    variant: {
      primary: "peer-checked:bg-sky-500",
      secondary: "peer-checked:bg-gray-500",
      success: "peer-checked:bg-green-500",
      danger: "peer-checked:bg-red-500",
      warning: "peer-checked:bg-yellow-500",
      info: "peer-checked:bg-blue-500",
      light: "peer-checked:bg-gray-100",
      dark: "peer-checked:bg-gray-800",
    },
    size: {
      small: "w-10 before:h-4 before:w-4 before:peer-checked:translate-x-4",
      normal: "w-14 before:h-6 before:w-6 before:peer-checked:translate-x-6",
      large: "w-18 before:h-8 before:w-8 before:peer-checked:translate-x-8",
    },
  },
  defaultVariants: {
    size: "normal",
    variant: "primary",
  },
});

const switchSizeClasses = cva("", {
  variants: {
    size: {
      small: "h-6",
      normal: "h-8",
      large: "h-10",
    },
  },
  defaultVariants: {
    size: "normal",
  },
});

const switchLabelClasses = cva("", {
  variants: {
    size: {
      small: "ml-12",
      normal: "ml-16",
      large: "ml-20",
    },
  },
  defaultVariants: {
    size: "normal",
  },
});

const switchIconClasses = cva("", {
  variants: {
    size: {
      small: "h-4 w-4 peer-checked:translate-x-4",
      normal: "h-6 w-6 peer-checked:translate-x-6",
      large: "h-8 w-8 peer-checked:translate-x-8",
    },
  },
  defaultVariants: {
    size: "normal",
  },
});

export interface SwitchButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof switchClasses>,
    VariantProps<typeof switchSizeClasses>,
    VariantProps<typeof switchLabelClasses>,
    VariantProps<typeof switchIconClasses> {
  offIcon?: React.ReactNode;
  onIcon?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Switch: React.FC<SwitchButtonProps> = ({ className, variant, size, children, ...props }) => {
  const [toggled, setToggled] = React.useState(false);

  return (
    <label htmlFor={props.id} className={clsx("relative inline-block", switchSizeClasses({ size }))}>
      {children ? (
        <span className={clsx("flex h-full items-center", switchLabelClasses({ size }))}>{children}</span>
      ) : null}
      <input
        type="checkbox"
        {...props}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setToggled(e.target.checked);
          if (props.onChange) props.onChange(e);
        }}
        className="peer h-0 w-0 opacity-0"
      />
      <span
        className={clsx(
          "absolute inset-0 cursor-pointer rounded-3xl bg-slate-600 transition-all duration-500 before:absolute before:bottom-1 before:left-1 before:rounded-full before:bg-white before:transition-[0.5s] peer-focus:shadow",
          switchClasses({ size, variant }),
        )}
      ></span>
      <span className={clsx("absolute bottom-1 left-1 text-black transition-[0.5s]", switchIconClasses({ size }))}>
        {(() => {
          if (props.icon) return props.icon;
          if (props?.onIcon && props?.offIcon) return toggled ? props.onIcon : props.offIcon;
          if (props.onIcon && !props?.offIcon) return props.onIcon;
          if (!props?.onIcon && props.offIcon) return props.offIcon;
          return <></>;
        })()}
      </span>
    </label>
  );
};
