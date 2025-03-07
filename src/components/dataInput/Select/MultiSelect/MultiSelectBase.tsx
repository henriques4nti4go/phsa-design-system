"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../../../lib/utils";
import * as Popover from "@radix-ui/react-popover";

export type MultiSelectBaseProps = {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
};

export function MultiSelectBase({
  options = [],
  selected = [],
  onChange,
  placeholder = "Select frameworks...",
  className,
}: MultiSelectBaseProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleRemoveItem = (valueToRemove: string) => {
    onChange(selected.filter((value) => value !== valueToRemove));
  };

  const handleSelectItem = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div
          className={cn(
            "flex min-h-[40px] w-full flex-wrap gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          {selected.map((value) => {
            const option = options.find((o) => o.value === value);
            if (!option) return null;

            return (
              <div
                key={value}
                className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground"
              >
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveItem(value);
                  }}
                  className="rounded-full hover:bg-secondary-foreground/20"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {option.label}</span>
                </button>
              </div>
            );
          })}
          <div className="flex-1">
            {selected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-[--radix-popover-trigger-width] z-50 mt-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
          align="start"
          sideOffset={4}
        >
          <div className="flex items-center border-b border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent px-2 outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-[200px] overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelectItem(option.value)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-accent",
                    selected.includes(option.value) && "bg-accent"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border border-primary",
                      selected.includes(option.value) &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    {selected.includes(option.value) && (
                      <span className="text-[10px]">✓</span>
                    )}
                  </div>
                  {option.label}
                </div>
              ))
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
