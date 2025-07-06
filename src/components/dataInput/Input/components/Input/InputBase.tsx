import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { Input, InputProps } from "../../../../ui/input";
import { mask as remask } from "remask";
import { cn } from "@/lib/utils";

export type InputBaseProps = InputProps & {
  onChangeText?: (text: string) => void;
  mask?: string | string[];
  "data-testid"?: string;
};

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ mask, className, ...props }, ref) => {
    const { onChangeText = () => {}, ...rest } = props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const setMask = useCallback(
      (value?: string | number | readonly string[] | undefined) => {
        const inputValue = value || "";
        if (!mask) return String(inputValue);
        return remask(String(inputValue), mask);
      },
      [mask]
    );

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <Input
        {...rest}
        ref={inputRef}
        className={cn(
          "border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
          "p-0 h-auto bg-transparent",
          className
        )}
        onChange={(e) => {
          const value = setMask(e.target.value);
          if (inputRef.current) {
            inputRef.current.value = value;
          }
          props.onChange?.(e);
          onChangeText(value);
        }}
      />
    );
  }
);

InputBase.displayName = "InputBase";
