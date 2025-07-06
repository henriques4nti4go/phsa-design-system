import React from "react";
import { Label } from "../../../../ui/label";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { InputBase, InputBaseProps } from "./InputBase";
import { ErrorMessage } from "../../../../../components/dataDisplay/ErrorMessage";
import { cn } from "@/lib/utils";

export type InputProps = Omit<InputBaseProps, "children"> & {
  component?: React.ReactNode;
  error?: string;
  withoutForm?: boolean;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  floatingLabel?: boolean;
};

export const Input = ({
  label,
  withoutForm,
  component,
  name,
  error,
  leftIcon,
  rightIcon,
  helperText,
  floatingLabel = false,
  "data-testid": testId,
  className,
  required,
  placeholder,
  ...props
}: InputProps) => {
  const form = useFormContext();
  const hasForm = !withoutForm && !!form && !!name;
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const containerClasses = cn("relative w-full", className);

  if (!hasForm)
    return (
      <div className={containerClasses}>
        <div className="relative">
          {/* Floating Label ou Label Normal */}
          {label && !floatingLabel && (
            <Label
              htmlFor={name || "input"}
              className={cn(
                "block text-sm font-medium mb-1.5 transition-colors duration-200",
                error ? "text-destructive" : "text-foreground"
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}

          {/* Input Container */}
          <div className="relative">
            {leftIcon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                {leftIcon}
              </div>
            )}

            <InputBase
              {...props}
              placeholder={floatingLabel ? " " : placeholder}
              className={cn(
                "w-full px-4 py-3 border border-border rounded-xl",
                "bg-background transition-all duration-200",
                "focus:border-primary focus:ring-4 focus:ring-primary/20",
                "placeholder:text-muted-foreground",
                "disabled:bg-muted disabled:text-muted-foreground",
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                error &&
                  "border-destructive focus:border-destructive focus:ring-destructive/20",
                floatingLabel && "pt-6 pb-2"
              )}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                setHasValue(!!e.target.value);
                props.onBlur?.(e);
              }}
            />

            {/* Floating Label */}
            {label && floatingLabel && (
              <Label
                htmlFor={name || "input"}
                className={cn(
                  "absolute left-4 transition-all duration-200 pointer-events-none",
                  "text-muted-foreground",
                  isFocused || hasValue
                    ? "top-2 text-xs font-medium"
                    : "top-1/2 transform -translate-y-1/2 text-base",
                  isFocused && !error && "text-primary",
                  error && "text-destructive"
                )}
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}

            {rightIcon && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                {rightIcon}
              </div>
            )}

            {component && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                {component}
              </div>
            )}
          </div>

          {/* Helper Text */}
          {helperText && !error && (
            <p className="mt-2 text-xs text-muted-foreground">{helperText}</p>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-2">
              <ErrorMessage>{error}</ErrorMessage>
            </div>
          )}
        </div>
      </div>
    );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem
          className={containerClasses}
          data-testid={testId ? `form-item-${testId}` : undefined}
        >
          <div className="relative">
            {/* Label Normal */}
            {label && !floatingLabel && (
              <FormLabel
                htmlFor={name}
                className={cn(
                  "block text-sm font-medium mb-1.5 transition-colors duration-200",
                  "text-foreground data-[invalid]:text-destructive"
                )}
                data-testid={testId ? `form-label-${testId}` : undefined}
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}

            <FormControl>
              <div className="relative">
                {leftIcon && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                    {leftIcon}
                  </div>
                )}

                <InputBase
                  {...props}
                  {...rest}
                  value={value}
                  onChangeText={onChange}
                  placeholder={floatingLabel ? " " : placeholder}
                  className={cn(
                    "w-full px-4 py-3 border border-border rounded-xl",
                    "bg-background transition-all duration-200",
                    "focus:border-primary focus:ring-4 focus:ring-primary/20",
                    "placeholder:text-muted-foreground",
                    "disabled:bg-muted disabled:text-muted-foreground",
                    leftIcon && "pl-10",
                    rightIcon && "pr-10",
                    floatingLabel && "pt-6 pb-2"
                  )}
                  onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus?.(e);
                  }}
                  onBlur={(e) => {
                    setIsFocused(false);
                    setHasValue(!!value);
                    props.onBlur?.(e);
                  }}
                />

                {/* Floating Label */}
                {label && floatingLabel && (
                  <FormLabel
                    htmlFor={name}
                    className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none",
                      "text-muted-foreground",
                      isFocused || hasValue || value
                        ? "top-2 text-xs font-medium"
                        : "top-1/2 transform -translate-y-1/2 text-base",
                      isFocused && "text-primary"
                    )}
                  >
                    {label}
                    {required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </FormLabel>
                )}

                {rightIcon && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                    {rightIcon}
                  </div>
                )}

                {component && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                    {component}
                  </div>
                )}
              </div>
            </FormControl>

            {/* Helper Text */}
            {helperText && (
              <p className="mt-2 text-xs text-muted-foreground">{helperText}</p>
            )}

            <FormMessage
              role="alert"
              className="mt-2"
              data-testid={testId ? `form-message-${testId}` : undefined}
            />
          </div>
        </FormItem>
      )}
    />
  );
};
