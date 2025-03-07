import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { Input, InputProps } from "../../../../ui/input";
import { mask as remask } from "remask";

export type InputBaseProps = InputProps & {
  onChangeText?: (text: string) => void;
  mask?: string | string[];
  "data-testid"?: string;
};

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ mask, ...props }, ref) => {
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
        onChange={(e) => {
          const value = setMask(e.target.value);
          console.log("value", value);
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
