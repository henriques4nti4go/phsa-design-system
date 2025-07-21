"use client"
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/dataDisplay/Table/components/DynamicTable/index.tsx
import * as React5 from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";

// src/components/ui/table.tsx
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/table.tsx
import { jsx } from "react/jsx-runtime";
var Table = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
    "table",
    __spreadValues({
      ref,
      className: cn("w-full caption-bottom text-sm", className)
    }, props)
  ) });
});
Table.displayName = "Table";
var TableHeader = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx("thead", __spreadValues({ ref, className: cn("[&_tr]:border-b", className) }, props));
});
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "tbody",
    __spreadValues({
      ref,
      className: cn("[&_tr:last-child]:border-0", className)
    }, props)
  );
});
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "tfoot",
    __spreadValues({
      ref,
      className: cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )
    }, props)
  );
});
TableFooter.displayName = "TableFooter";
var TableRow = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "tr",
    __spreadValues({
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )
    }, props)
  );
});
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "th",
    __spreadValues({
      ref,
      className: cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )
    }, props)
  );
});
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "td",
    __spreadValues({
      ref,
      className: cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )
    }, props)
  );
});
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    "caption",
    __spreadValues({
      ref,
      className: cn("mt-4 text-sm text-muted-foreground", className)
    }, props)
  );
});
TableCaption.displayName = "TableCaption";

// src/components/dataDisplay/Table/components/DynamicTable/data-table-view-options.tsx
import { DropdownMenuTrigger as DropdownMenuTrigger2 } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

// src/components/ui/button.tsx
import * as React2 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, size, asChild = false } = _b, props = __objRest(_b, ["className", "variant", "size", "asChild"]);
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx2(
      Comp,
      __spreadValues({
        className: cn(buttonVariants({ variant, size, className })),
        ref
      }, props)
    );
  }
);
Button.displayName = "Button";

// src/components/ui/dropdown-menu.tsx
import * as React3 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, inset, children } = _b, props = __objRest(_b, ["className", "inset", "children"]);
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.SubTrigger,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "pl-8",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx3(ChevronRight, { className: "ml-auto" })
      ]
    })
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx3(
    DropdownMenuPrimitive.SubContent,
    __spreadValues({
      ref,
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, sideOffset = 4 } = _b, props = __objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ jsx3(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx3(
    DropdownMenuPrimitive.Content,
    __spreadValues({
      ref,
      sideOffset,
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  ) });
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, inset } = _b, props = __objRest(_b, ["className", "inset"]);
  return /* @__PURE__ */ jsx3(
    DropdownMenuPrimitive.Item,
    __spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
        inset && "pl-8",
        className
      )
    }, props)
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, children, checked } = _b, props = __objRest(_b, ["className", "children", "checked"]);
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      checked
    }, props), {
      children: [
        /* @__PURE__ */ jsx3("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx3(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx3(Check, { className: "h-4 w-4" }) }) }),
        children
      ]
    })
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.RadioItem,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx3("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx3(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx3(Circle, { className: "h-2 w-2 fill-current" }) }) }),
        children
      ]
    })
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, inset } = _b, props = __objRest(_b, ["className", "inset"]);
  return /* @__PURE__ */ jsx3(
    DropdownMenuPrimitive.Label,
    __spreadValues({
      ref,
      className: cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )
    }, props)
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx3(
    DropdownMenuPrimitive.Separator,
    __spreadValues({
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className)
    }, props)
  );
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx3(
    "span",
    __spreadValues({
      className: cn("ml-auto text-xs tracking-widest opacity-60", className)
    }, props)
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// src/components/dataDisplay/Table/components/DynamicTable/data-table-view-options.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function DataTableViewOptions({
  table
}) {
  return /* @__PURE__ */ jsxs2(DropdownMenu, { children: [
    /* @__PURE__ */ jsx4(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsxs2(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "ml-auto hidden h-8 lg:flex",
        children: [
          /* @__PURE__ */ jsx4(MixerHorizontalIcon, { className: "mr-2 h-4 w-4" }),
          "Colunas"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs2(DropdownMenuContent, { align: "end", className: "w-[150px]", children: [
      /* @__PURE__ */ jsx4(DropdownMenuLabel, { children: "Colunas vis\xEDveis" }),
      /* @__PURE__ */ jsx4(DropdownMenuSeparator, {}),
      table.getAllColumns().filter(
        (column) => typeof column.accessorFn !== "undefined" && column.getCanHide()
      ).map((column) => {
        return /* @__PURE__ */ jsx4(
          DropdownMenuCheckboxItem,
          {
            className: "capitalize",
            checked: column.getIsVisible(),
            onCheckedChange: (value) => column.toggleVisibility(!!value),
            children: column.id
          },
          column.id
        );
      })
    ] })
  ] });
}

// src/components/dataDisplay/Table/components/DynamicTable/data-table-toolbar.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function DataTableToolbar({
  table,
  filters,
  showColumnVisibility
}) {
  return /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx5("div", { className: "flex flex-1 items-center space-x-2", children: filters }),
    showColumnVisibility && /* @__PURE__ */ jsx5(DataTableViewOptions, { table })
  ] });
}

// src/components/dataDisplay/Table/components/DynamicTable/data-table-pagination.tsx
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from "@radix-ui/react-icons";

// src/components/ui/select.tsx
import * as React4 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as Check2, ChevronDown, ChevronUp } from "lucide-react";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React4.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs4(
    SelectPrimitive.Trigger,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx6(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx6(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
      ]
    })
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx6(
    SelectPrimitive.ScrollUpButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx6(ChevronUp, { className: "h-4 w-4" })
    })
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx6(
    SelectPrimitive.ScrollDownButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx6(ChevronDown, { className: "h-4 w-4" })
    })
  );
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React4.forwardRef((_a, ref) => {
  var _b = _a, { className, children, position = "popper" } = _b, props = __objRest(_b, ["className", "children", "position"]);
  return /* @__PURE__ */ jsx6(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs4(
    SelectPrimitive.Content,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position
    }, props), {
      children: [
        /* @__PURE__ */ jsx6(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx6(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx6(SelectScrollDownButton, {})
      ]
    })
  ) });
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx6(
    SelectPrimitive.Label,
    __spreadValues({
      ref,
      className: cn("px-2 py-1.5 text-sm font-semibold", className)
    }, props)
  );
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React4.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs4(
    SelectPrimitive.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx6("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx6(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx6(Check2, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx6(SelectPrimitive.ItemText, { children })
      ]
    })
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx6(
    SelectPrimitive.Separator,
    __spreadValues({
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className)
    }, props)
  );
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/dataDisplay/Table/components/DynamicTable/data-table-pagination.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function DataTablePagination({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50]
}) {
  return /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between px-2", children: [
    /* @__PURE__ */ jsxs5("div", { className: "flex-1 text-sm text-muted-foreground", children: [
      table.getFilteredSelectedRowModel().rows.length,
      " de",
      " ",
      table.getFilteredRowModel().rows.length,
      " linha(s) selecionada(s)."
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx7("p", { className: "text-sm font-medium", children: "Linhas por p\xE1gina" }),
        /* @__PURE__ */ jsxs5(
          Select,
          {
            value: `${table.getState().pagination.pageSize}`,
            onValueChange: (value) => {
              table.setPageSize(Number(value));
            },
            children: [
              /* @__PURE__ */ jsx7(SelectTrigger, { className: "h-8 w-[70px]", children: /* @__PURE__ */ jsx7(SelectValue, { placeholder: table.getState().pagination.pageSize }) }),
              /* @__PURE__ */ jsx7(SelectContent, { side: "top", children: pageSizeOptions.map((pageSize) => /* @__PURE__ */ jsx7(SelectItem, { value: `${pageSize}`, children: pageSize }, pageSize)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
        "P\xE1gina ",
        table.getState().pagination.pageIndex + 1,
        " de",
        " ",
        table.getPageCount()
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx7(
          Button,
          {
            variant: "outline",
            className: "hidden h-8 w-8 p-0 lg:flex",
            onClick: () => table.setPageIndex(0),
            disabled: !table.getCanPreviousPage(),
            children: /* @__PURE__ */ jsx7(DoubleArrowLeftIcon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx7(
          Button,
          {
            variant: "outline",
            className: "h-8 w-8 p-0",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: /* @__PURE__ */ jsx7(ChevronLeftIcon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx7(
          Button,
          {
            variant: "outline",
            className: "h-8 w-8 p-0",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: /* @__PURE__ */ jsx7(ChevronRightIcon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx7(
          Button,
          {
            variant: "outline",
            className: "hidden h-8 w-8 p-0 lg:flex",
            onClick: () => table.setPageIndex(table.getPageCount() - 1),
            disabled: !table.getCanNextPage(),
            children: /* @__PURE__ */ jsx7(DoubleArrowRightIcon, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}

// src/components/dataDisplay/Table/components/DynamicTable/data-table-column-header.tsx
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon
} from "@radix-ui/react-icons";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
function DataTableColumnHeader({
  column,
  title,
  className
}) {
  if (!column.getCanSort()) {
    return /* @__PURE__ */ jsx8("div", { className: cn(className), children: title });
  }
  return /* @__PURE__ */ jsx8("div", { className: cn("flex items-center space-x-2", className), children: /* @__PURE__ */ jsxs6(DropdownMenu, { children: [
    /* @__PURE__ */ jsx8(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs6(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "-ml-3 h-8 data-[state=open]:bg-accent",
        children: [
          /* @__PURE__ */ jsx8("span", { children: title }),
          column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx8(ArrowDownIcon, { className: "ml-2 h-4 w-4" }) : column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx8(ArrowUpIcon, { className: "ml-2 h-4 w-4" }) : /* @__PURE__ */ jsx8(CaretSortIcon, { className: "ml-2 h-4 w-4" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs6(DropdownMenuContent, { align: "start", children: [
      /* @__PURE__ */ jsxs6(DropdownMenuItem, { onClick: () => column.toggleSorting(false), children: [
        /* @__PURE__ */ jsx8(ArrowUpIcon, { className: "mr-2 h-3.5 w-3.5 text-muted-foreground/70" }),
        "Crescente"
      ] }),
      /* @__PURE__ */ jsxs6(DropdownMenuItem, { onClick: () => column.toggleSorting(true), children: [
        /* @__PURE__ */ jsx8(ArrowDownIcon, { className: "mr-2 h-3.5 w-3.5 text-muted-foreground/70" }),
        "Decrescente"
      ] }),
      /* @__PURE__ */ jsx8(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs6(DropdownMenuItem, { onClick: () => column.toggleVisibility(false), children: [
        /* @__PURE__ */ jsx8(EyeNoneIcon, { className: "mr-2 h-3.5 w-3.5 text-muted-foreground/70" }),
        "Ocultar"
      ] })
    ] })
  ] }) });
}

// src/components/dataDisplay/Table/components/DynamicTable/index.tsx
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
function DynamicTable({
  data,
  columns,
  className,
  toolbar,
  pagination: showPagination = true,
  sorting: showSorting = true,
  columnVisibility: showColumnVisibility = true,
  filters,
  rowsPerPage = [10, 20, 30, 40, 50],
  defaultSort = [],
  defaultVisibility = {}
}) {
  var _a;
  const [sorting, setSorting] = React5.useState(defaultSort);
  const [columnVisibility, setColumnVisibility] = React5.useState(defaultVisibility);
  const [{ pageIndex, pageSize }, setPagination] = React5.useState({
    pageIndex: 0,
    pageSize: rowsPerPage[0]
  });
  const pagination = React5.useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: showSorting ? getSortedRowModel() : void 0,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    manualPagination: false,
    pageCount: Math.ceil(data.length / pageSize),
    state: {
      sorting,
      columnVisibility,
      pagination
    },
    enableSorting: showSorting
  });
  return /* @__PURE__ */ jsxs7("div", { className: "space-y-4", children: [
    (toolbar || filters || showColumnVisibility) && /* @__PURE__ */ jsx9(
      DataTableToolbar,
      {
        table,
        filters,
        showColumnVisibility
      }
    ),
    /* @__PURE__ */ jsx9("div", { className: cn("rounded-md border", className), children: /* @__PURE__ */ jsxs7(Table, { children: [
      /* @__PURE__ */ jsx9(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx9(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx9(TableHead, { children: header.isPlaceholder ? null : /* @__PURE__ */ jsx9(
        DataTableColumnHeader,
        {
          column: header.column,
          title: header.column.columnDef.header
        }
      ) }, header.id)) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx9(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx9(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx9(TableCell, { children: flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      ) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx9(TableRow, { children: /* @__PURE__ */ jsx9(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "Nenhum resultado encontrado."
        }
      ) }) })
    ] }) }),
    showPagination && /* @__PURE__ */ jsx9(DataTablePagination, { table, pageSizeOptions: rowsPerPage })
  ] });
}

// src/components/ui/badge.tsx
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx10 } from "react/jsx-runtime";
var badgeVariants = cva2(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        success: "border-transparent bg-success text-primary-foreground shadow hover:bg-success/80",
        warning: "border-transparent bg-warning text-primary-foreground shadow hover:bg-warning/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge(_a) {
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ jsx10("div", __spreadValues({ className: cn(badgeVariants({ variant }), className) }, props));
}

// src/components/dataDisplay/Icon/Icon.tsx
import { useCallback, useMemo as useMemo2 } from "react";
import { IconContext } from "react-icons";
import { Fragment, jsx as jsx11 } from "react/jsx-runtime";
var Icon2 = (_a) => {
  var _b = _a, { name, size = 24 } = _b, rest = __objRest(_b, ["name", "size"]);
  const nameIcon = useMemo2(() => name, [name]);
  const iconsModulePath = useMemo2(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      md: __require("react-icons/md"),
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      fa: __require("react-icons/fa"),
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      bs: __require("react-icons/bs")
    }),
    []
  );
  const typeIcon = useMemo2(() => {
    var _a2;
    const matches = [...nameIcon.matchAll(/[A-Z]/g)];
    return String(
      nameIcon.slice(0, (_a2 = matches[1]) == null ? void 0 : _a2.index) || ""
    ).toLocaleLowerCase();
  }, [nameIcon]);
  const Icon3 = useCallback(
    (props) => {
      var _a2, _b2;
      try {
        if (!typeIcon || !nameIcon) return /* @__PURE__ */ jsx11(Fragment, {});
        return (_b2 = (_a2 = iconsModulePath[typeIcon])[nameIcon]) == null ? void 0 : _b2.call(_a2, props);
      } catch (e) {
        return /* @__PURE__ */ jsx11(Fragment, {});
      }
    },
    [iconsModulePath, nameIcon, typeIcon]
  );
  return /* @__PURE__ */ jsx11(IconContext.Provider, { value: { size: String(size) }, children: /* @__PURE__ */ jsx11(Icon3, __spreadValues({}, rest)) });
};

// src/components/ui/avatar.tsx
import * as React7 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { jsx as jsx12 } from "react/jsx-runtime";
var Avatar = React7.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx12(
    AvatarPrimitive.Root,
    __spreadValues({
      ref,
      className: cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )
    }, props)
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React7.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx12(
    AvatarPrimitive.Image,
    __spreadValues({
      ref,
      className: cn("aspect-square h-full w-full", className)
    }, props)
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React7.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx12(
    AvatarPrimitive.Fallback,
    __spreadValues({
      ref,
      className: cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )
    }, props)
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// src/components/dataDisplay/DataPairList/DataPairList.tsx
import { isEmpty } from "lodash";

// src/components/dataDisplay/Text/Text.tsx
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx13 } from "react/jsx-runtime";
var textVariants = cva3("", {
  variants: {
    variant: {
      display: "text-5xl font-extrabold tracking-tight",
      title: "text-3xl font-bold tracking-tight",
      subtitle: "text-2xl font-semibold",
      normal: "text-base font-normal",
      caption: "text-sm font-medium",
      muted: "text-sm font-normal text-muted-foreground"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify"
    }
  },
  defaultVariants: {
    variant: "normal",
    align: "left"
  }
});
var tagMap = {
  display: "h1",
  title: "h2",
  subtitle: "h3",
  normal: "p",
  caption: "small",
  muted: "p"
};
function Text({
  variant = "normal",
  align,
  className,
  children
}) {
  const Tag = tagMap[variant || "normal"] || "p";
  return /* @__PURE__ */ jsx13(Tag, { className: cn(textVariants({ variant, align }), className), children });
}

// src/components/dataDisplay/DataPairList/DataPairList.tsx
import { Fragment as Fragment2, jsx as jsx14, jsxs as jsxs8 } from "react/jsx-runtime";
var DataPairList = ({
  title,
  data,
  labels,
  className,
  infoDirection = "horizontal",
  direction = "vertical",
  withBorder = false,
  header = /* @__PURE__ */ jsx14(Fragment2, {})
}) => {
  if (isEmpty(data)) return null;
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      className: cn(
        "flex flex-col gap-2 rounded-md p-4",
        withBorder && "border border-muted",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs8("div", { className: "flex gap-3", children: [
          title && /* @__PURE__ */ jsx14(Text, { variant: "title", children: title }),
          header
        ] }),
        /* @__PURE__ */ jsx14(
          "div",
          {
            className: cn(
              "grid grid-cols-1  mt-5",
              direction === "vertical" ? "gap-3" : "sm:grid-cols-2 md:grid-cols-4 gap-10"
            ),
            children: Object.entries(data || {}).map(([key, value], index) => /* @__PURE__ */ jsxs8(
              "div",
              {
                className: cn(
                  "flex gap-3",
                  infoDirection === "horizontal" ? "flex-row" : "flex-col"
                ),
                children: [
                  /* @__PURE__ */ jsxs8(Text, { className: "uppercase text-muted-foreground font-bold", children: [
                    (labels == null ? void 0 : labels[key]) || key,
                    ":"
                  ] }),
                  /* @__PURE__ */ jsx14(Text, { children: value })
                ]
              },
              index
            ))
          }
        )
      ]
    }
  );
};

// src/components/dataInput/checkbox/Checkbox.tsx
import { useFormContext as useFormContext3 } from "react-hook-form";

// src/components/ui/checkbox.tsx
import * as React8 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check as Check3 } from "lucide-react";
import { jsx as jsx15 } from "react/jsx-runtime";
var Checkbox = React8.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx15(
    CheckboxPrimitive.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx15(
        CheckboxPrimitive.Indicator,
        {
          className: cn("flex items-center justify-center text-current"),
          children: /* @__PURE__ */ jsx15(Check3, { className: "h-4 w-4" })
        }
      )
    })
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/ui/label.tsx
import * as React9 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva4 } from "class-variance-authority";
import { jsx as jsx16 } from "react/jsx-runtime";
var labelVariants = cva4(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label3 = React9.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx16(
    LabelPrimitive.Root,
    __spreadValues({
      ref,
      className: cn(labelVariants(), className)
    }, props)
  );
});
Label3.displayName = LabelPrimitive.Root.displayName;

// src/components/dataInput/form/index.ts
import { useFormContext as useFormContext2 } from "react-hook-form";

// src/components/ui/form.tsx
import * as React10 from "react";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";
import { jsx as jsx17 } from "react/jsx-runtime";
var Form = FormProvider;
var FormFieldContext = React10.createContext(
  {}
);
var FormField = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx17(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx17(Controller, __spreadValues({}, props)) });
};
var useFormField = () => {
  const fieldContext = React10.useContext(FormFieldContext);
  const itemContext = React10.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return __spreadValues({
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`
  }, fieldState);
};
var FormItemContext = React10.createContext(
  {}
);
var FormItem = React10.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const id = React10.useId();
  return /* @__PURE__ */ jsx17(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx17("div", __spreadValues({ ref, className: cn("space-y-2", className) }, props)) });
});
FormItem.displayName = "FormItem";
var FormLabel = React10.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx17(
    Label3,
    __spreadValues({
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId
    }, props)
  );
});
FormLabel.displayName = "FormLabel";
var FormControl = React10.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx17(
    Slot2,
    __spreadValues({
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error
    }, props)
  );
});
FormControl.displayName = "FormControl";
var FormDescription = React10.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx17(
    "p",
    __spreadValues({
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className)
    }, props)
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = React10.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx17(
    "p",
    __spreadProps(__spreadValues({
      ref,
      id: formMessageId,
      className: cn("text-[0.8rem] font-medium text-destructive", className)
    }, props), {
      children: body
    })
  );
});
FormMessage.displayName = "FormMessage";

// src/components/dataDisplay/ErrorMessage/ErrorMessage.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
var ErrorMessage = ({ children }) => {
  return /* @__PURE__ */ jsx18("p", { className: "text-sm font-medium text-destructive", children });
};

// src/components/dataInput/checkbox/Checkbox.tsx
import { jsx as jsx19, jsxs as jsxs9 } from "react/jsx-runtime";
var Checkbox2 = (_a) => {
  var _b = _a, {
    label,
    error,
    withoutForm
  } = _b, props = __objRest(_b, [
    "label",
    "error",
    "withoutForm"
  ]);
  var _a2;
  const form = useFormContext3();
  const hasForm = !withoutForm && !!form && !!props.name;
  if (!hasForm)
    return /* @__PURE__ */ jsxs9("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx19(Checkbox, __spreadValues({}, props)),
      label && /* @__PURE__ */ jsx19(Label3, { htmlFor: props.id, children: label }),
      error && /* @__PURE__ */ jsx19(ErrorMessage, { children: error })
    ] });
  return /* @__PURE__ */ jsx19(
    FormField,
    {
      control: form.control,
      name: (_a2 = props.name) != null ? _a2 : "",
      render: ({ field }) => /* @__PURE__ */ jsxs9(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4", children: [
        /* @__PURE__ */ jsx19(FormControl, { children: /* @__PURE__ */ jsx19(
          Checkbox,
          {
            checked: field.value,
            onCheckedChange: field.onChange
          }
        ) }),
        label && /* @__PURE__ */ jsx19("div", { className: "space-y-1 leading-none", children: /* @__PURE__ */ jsx19(FormLabel, { children: label }) })
      ] })
    }
  );
};

// src/components/ui/input.tsx
import * as React11 from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var Input = React11.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type } = _b, props = __objRest(_b, ["className", "type"]);
    return /* @__PURE__ */ jsx20(
      "input",
      __spreadValues({
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref
      }, props)
    );
  }
);
Input.displayName = "Input";

// src/components/dataInput/Input/components/Input/index.tsx
import { useMemo as useMemo4 } from "react";

// src/components/feedback/ErrorLabel/index.tsx
import { jsx as jsx21, jsxs as jsxs10 } from "react/jsx-runtime";
var ErrorLabel = ({
  children,
  className,
  "data-testid": dataTestId
}) => {
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      className: cn("flex items-center gap-2 my-2", className),
      "data-testid": `${dataTestId}-error-label`,
      children: [
        /* @__PURE__ */ jsx21(Icon2, { name: "MdErrorOutline", size: 18, className: "text-destructive" }),
        /* @__PURE__ */ jsx21("span", { className: "text-destructive text-sm", children })
      ]
    }
  );
};

// src/components/dataInput/Input/components/InputBase/index.tsx
import { jsx as jsx22, jsxs as jsxs11 } from "react/jsx-runtime";
var InputBase = ({
  label,
  error,
  children,
  required,
  "data-testid": testId
}) => {
  return /* @__PURE__ */ jsxs11("div", { children: [
    label && /* @__PURE__ */ jsxs11(Label3, { "data-testid": `${testId}-label`, children: [
      `${label} ${required ? "*" : ""}`,
      " "
    ] }),
    children,
    error && /* @__PURE__ */ jsx22(ErrorLabel, { "data-testid": testId, children: error })
  ] });
};

// src/hooks/use-conditional-controller.tsx
import { useMemo as useMemo3 } from "react";
import {
  useController,
  useForm,
  useFormContext as useFormContext4
} from "react-hook-form";
var useConditionalController = ({
  name,
  withoutForm
}) => {
  const form = useFormContext4();
  const hasForm = useMemo3(() => {
    return !withoutForm && !!(form == null ? void 0 : form.control);
  }, [withoutForm, form]);
  const tempForm = useForm();
  const controlToUse = useMemo3(() => {
    return hasForm ? form.control : tempForm.control;
  }, [tempForm, form, hasForm]);
  const controller = useController({
    control: controlToUse,
    name: name || "temp"
  });
  return hasForm ? controller.field : {};
};

// src/components/dataInput/Input/components/Input/index.tsx
import { jsx as jsx23, jsxs as jsxs12 } from "react/jsx-runtime";
var Input2 = (_a) => {
  var _b = _a, {
    "data-testid": dataTestId,
    withoutForm = false,
    extraElement,
    containerClassName
  } = _b, props = __objRest(_b, [
    "data-testid",
    "withoutForm",
    "extraElement",
    "containerClassName"
  ]);
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm
  });
  const inputProps = useMemo4(() => {
    return __spreadValues(__spreadValues({}, formData), props);
  }, [formData, props]);
  return /* @__PURE__ */ jsx23(
    InputBase,
    {
      label: props.label,
      error: props.error,
      required: props.required,
      "data-testid": dataTestId,
      children: /* @__PURE__ */ jsxs12("div", { className: cn("flex items-center gap-2", containerClassName), children: [
        /* @__PURE__ */ jsx23(
          Input,
          __spreadProps(__spreadValues({}, inputProps), {
            "data-testid": dataTestId,
            className: cn(
              props.className,
              props.error && "border-destructive focus:border-destructive focus-visible:ring-0"
            )
          })
        ),
        extraElement
      ] })
    }
  );
};

// src/components/dataInput/Input/components/NumberInput/number-input.tsx
import {
  NumericFormat
} from "react-number-format";
import { useCallback as useCallback2, useMemo as useMemo5 } from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var NumberInput = (props) => {
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm: props.withoutForm
  });
  const inputProps = useMemo5(() => {
    return __spreadValues(__spreadValues({}, formData), props);
  }, [formData, props]);
  const onValueChange = useCallback2(
    (data, sourceInfo) => {
      var _a, _b;
      const syntheticEvent = {
        target: {
          value: data.formattedValue,
          name: props.name
        },
        currentTarget: {
          value: data.formattedValue,
          name: props.name
        }
      };
      (_a = props.onChange) == null ? void 0 : _a.call(props, syntheticEvent);
      (_b = props.onValueChange) == null ? void 0 : _b.call(props, data, sourceInfo);
      if (formData.onChange) {
        formData.onChange(data.formattedValue);
      }
    },
    [props, formData]
  );
  return /* @__PURE__ */ jsx24(InputBase, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ jsx24(
    NumericFormat,
    __spreadProps(__spreadValues({}, inputProps), {
      customInput: Input,
      value: props.value,
      onValueChange
    })
  ) }));
};

// src/components/dataInput/Input/components/MaskInput/mask-input.tsx
import * as React12 from "react";

// src/hooks/use-mask.tsx
import { useState as useState2, useCallback as useCallback3 } from "react";
var useMask = (_a) => {
  var _b = _a, { mask } = _b, options = __objRest(_b, ["mask"]);
  const [value, setValue] = useState2("");
  const applyMask = useCallback3(
    (inputValue) => {
      if (!inputValue || !mask) return "";
      const cleanValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");
      let maskedValue = "";
      let cleanIndex = 0;
      for (let i = 0; i < mask.length && cleanIndex < cleanValue.length; i++) {
        const maskChar = mask[i];
        const inputChar = cleanValue[cleanIndex];
        if (maskChar === "9") {
          if (/\d/.test(inputChar)) {
            maskedValue += inputChar;
            cleanIndex++;
          } else {
            cleanIndex++;
            i--;
          }
        } else if (maskChar === "A") {
          if (/[a-zA-Z]/.test(inputChar)) {
            let char = inputChar;
            if (options.transform === "uppercase") char = char.toUpperCase();
            else if (options.transform === "lowercase")
              char = char.toLowerCase();
            maskedValue += char;
            cleanIndex++;
          } else {
            cleanIndex++;
            i--;
          }
        } else {
          maskedValue += maskChar;
        }
      }
      return maskedValue;
    },
    [mask, options.transform]
  );
  const handleSetValue = useCallback3(
    (newValue) => {
      const maskedValue = applyMask(newValue);
      setValue(maskedValue);
    },
    [applyMask]
  );
  const getRawValue = useCallback3(() => {
    return value.replace(/[^a-zA-Z0-9]/g, "");
  }, [value]);
  const isComplete = useCallback3(() => {
    return value.length === mask.length;
  }, [value, mask]);
  const isValid = useCallback3(() => {
    return isComplete() && value.length > 0;
  }, [isComplete, value]);
  const clear = useCallback3(() => {
    setValue("");
  }, []);
  const getFormProps = useCallback3(
    () => ({
      value,
      onChange: (e) => {
        handleSetValue(e.target.value);
      },
      placeholder: options.placeholder
    }),
    [value, handleSetValue, options.placeholder]
  );
  return {
    value,
    setValue: handleSetValue,
    rawValue: getRawValue(),
    isComplete: isComplete(),
    isValid: isValid(),
    applyMask,
    clear,
    placeholder: options.placeholder || mask.replace(/[9A]/g, "_"),
    formProps: getFormProps()
  };
};

// src/components/dataInput/Input/components/MaskInput/mask-input.tsx
import { useRef } from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
var MaskInput = (_a) => {
  var _b = _a, {
    "data-testid": dataTestId,
    withoutForm = false,
    extraElement,
    mask = ""
  } = _b, props = __objRest(_b, [
    "data-testid",
    "withoutForm",
    "extraElement",
    "mask"
  ]);
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm
  });
  const inputProps = React12.useMemo(() => {
    return __spreadValues(__spreadValues({}, formData), props);
  }, [formData, props]);
  const { applyMask } = useMask({ mask });
  const inputRef = useRef(null);
  const applyMaskToInput = React12.useCallback(
    (value) => {
      if (inputRef.current && mask) {
        const maskedValue = applyMask(value);
        inputRef.current.value = maskedValue;
      }
    },
    [applyMask, mask]
  );
  const handleChange = React12.useCallback(
    (e) => {
      var _a2;
      const maskedValue = mask ? applyMask(e.target.value) : e.target.value;
      const response = __spreadProps(__spreadValues({}, e), {
        target: __spreadProps(__spreadValues({}, e.target), {
          value: maskedValue
        })
      });
      applyMaskToInput(maskedValue);
      return (_a2 = inputProps == null ? void 0 : inputProps.onChange) == null ? void 0 : _a2.call(inputProps, response);
    },
    [applyMask, inputProps, mask, applyMaskToInput]
  );
  return /* @__PURE__ */ jsx25(
    Input2,
    __spreadProps(__spreadValues({}, inputProps), {
      ref: inputRef,
      onChange: handleChange,
      extraElement,
      "data-testid": dataTestId,
      withoutForm: true
    })
  );
};

// src/components/actions/Button/Button.tsx
import { forwardRef as forwardRef11 } from "react";

// src/components/ui/spinner.tsx
import { cva as cva5 } from "class-variance-authority";
import { jsx as jsx26, jsxs as jsxs13 } from "react/jsx-runtime";
var spinnerVariants = cva5("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden"
    }
  },
  defaultVariants: {
    show: true
  }
});
var loaderVariants = cva5("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12"
    }
  },
  defaultVariants: {
    size: "medium"
  }
});
function Spinner({
  size,
  show,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs13("span", { className: spinnerVariants({ show }), children: [
    /* @__PURE__ */ jsx26(
      Icon2,
      {
        name: "FaSpinner",
        className: cn(loaderVariants({ size }), className)
      }
    ),
    children
  ] });
}

// src/hooks/use-toast.ts
import * as React13 from "react";
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      });
    case "UPDATE_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? __spreadValues(__spreadValues({}, t), action.toast) : t
        )
      });
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? __spreadProps(__spreadValues({}, t), {
            open: false
          }) : t
        )
      });
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return __spreadProps(__spreadValues({}, state), {
          toasts: []
        });
      }
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      });
  }
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast(_a) {
  var props = __objRest(_a, []);
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: __spreadProps(__spreadValues({}, props2), { id })
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: __spreadProps(__spreadValues({}, props), {
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    })
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React13.useState(memoryState);
  React13.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return __spreadProps(__spreadValues({}, state), {
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  });
}

// src/components/ui/toast.tsx
import * as React14 from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva as cva6 } from "class-variance-authority";
import { X } from "lucide-react";
import { jsx as jsx27 } from "react/jsx-runtime";
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx27(
    ToastPrimitives.Viewport,
    __spreadValues({
      ref,
      className: cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )
    }, props)
  );
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva6(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "border-success bg-success text-success-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ jsx27(
    ToastPrimitives.Root,
    __spreadValues({
      ref,
      className: cn(toastVariants({ variant }), className)
    }, props)
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx27(
    ToastPrimitives.Action,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className
      )
    }, props)
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx27(
    ToastPrimitives.Close,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        className
      ),
      "toast-close": ""
    }, props), {
      children: /* @__PURE__ */ jsx27(X, { className: "h-4 w-4" })
    })
  );
});
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx27(
    ToastPrimitives.Title,
    __spreadValues({
      ref,
      className: cn("text-sm font-semibold [&+div]:text-xs", className)
    }, props)
  );
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx27(
    ToastPrimitives.Description,
    __spreadValues({
      ref,
      className: cn("text-sm opacity-90", className)
    }, props)
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// src/components/ui/toaster.tsx
import { jsx as jsx28, jsxs as jsxs14 } from "react/jsx-runtime";
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs14(ToastProvider, { children: [
    toasts.map(function(_a) {
      var _b = _a, { id, title, description, action } = _b, props = __objRest(_b, ["id", "title", "description", "action"]);
      return /* @__PURE__ */ jsxs14(Toast, __spreadProps(__spreadValues({}, props), { children: [
        /* @__PURE__ */ jsxs14("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx28(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx28(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx28(ToastClose, {})
      ] }), id);
    }),
    /* @__PURE__ */ jsx28(ToastViewport, {})
  ] });
}

// src/components/actions/Button/Button.tsx
import { jsx as jsx29, jsxs as jsxs15 } from "react/jsx-runtime";
var Button2 = forwardRef11(
  (_a, ref) => {
    var _b = _a, { children, disabled, loading } = _b, rest = __objRest(_b, ["children", "disabled", "loading"]);
    return /* @__PURE__ */ jsxs15(Button, __spreadProps(__spreadValues({}, rest), { disabled: disabled || loading, ref, children: [
      loading && /* @__PURE__ */ jsx29(Spinner, { className: "fill-white" }),
      children
    ] }));
  }
);
Button2.displayName = "Button";

// src/components/dataInput/Input/components/MultipleInput/MultipleInput.tsx
import { useCallback as useCallback5, useMemo as useMemo7, useState as useState4 } from "react";
import { jsx as jsx30, jsxs as jsxs16 } from "react/jsx-runtime";
var MultipleInput = (_a) => {
  var _b = _a, {
    data = [],
    onAdd = () => {
    },
    defaultValue = "",
    onRemove = () => {
    },
    withoutForm = false
  } = _b, props = __objRest(_b, [
    "data",
    "onAdd",
    "defaultValue",
    "onRemove",
    "withoutForm"
  ]);
  const [inputValue, setInputValue] = useState4(defaultValue);
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm
  });
  const inputItems = useMemo7(() => {
    if (formData == null ? void 0 : formData.value) {
      return formData.value;
    }
    return data;
  }, [data, formData]);
  const onAddData = useCallback5(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      if (formData == null ? void 0 : formData.onChange) {
        formData.onChange([...inputItems, trimmedValue]);
      } else {
        onAdd(trimmedValue);
      }
      setInputValue("");
    }
  }, [inputValue, formData, onAdd, inputItems]);
  const onRemoveData = useCallback5(
    (index) => {
      if (formData == null ? void 0 : formData.onChange) {
        const newData = inputItems.filter(
          (_2, i) => i !== index
        );
        formData.onChange(newData);
      } else {
        onRemove(index);
      }
    },
    [formData, inputItems, onRemove]
  );
  const renderItens = useCallback5(() => {
    return inputItems == null ? void 0 : inputItems.map((item, index) => {
      return /* @__PURE__ */ jsxs16("div", { className: "flex justify-between", children: [
        item,
        /* @__PURE__ */ jsx30(
          Button2,
          {
            variant: "ghost",
            className: "text-destructive",
            size: "icon",
            onClick: () => onRemoveData(index),
            children: /* @__PURE__ */ jsx30(Icon2, { name: "MdDelete" })
          }
        )
      ] }, item);
    });
  }, [inputItems, onRemoveData]);
  const extraElement = useMemo7(
    () => /* @__PURE__ */ jsx30(Button2, { type: "button", onClick: onAddData, disabled: !inputValue, children: /* @__PURE__ */ jsx30(Icon2, { name: "MdAdd" }) }),
    [onAddData, inputValue]
  );
  return /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx30(
      MaskInput,
      __spreadProps(__spreadValues({}, props), {
        withoutForm: true,
        extraElement,
        onChange: (e) => {
          setInputValue(e.target.value);
        },
        value: inputValue
      })
    ),
    renderItens()
  ] });
};

// src/components/ui/dialog.tsx
import * as React15 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X as X2 } from "lucide-react";
import { jsx as jsx31, jsxs as jsxs17 } from "react/jsx-runtime";
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React15.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx31(
    DialogPrimitive.Overlay,
    __spreadValues({
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props)
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React15.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs17(DialogPortal, { children: [
    /* @__PURE__ */ jsx31(DialogOverlay, {}),
    /* @__PURE__ */ jsxs17(
      DialogPrimitive.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-auto max-h-[80vh]",
          className
        )
      }, props), {
        children: [
          children,
          /* @__PURE__ */ jsxs17(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsx31(X2, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx31("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      })
    )
  ] });
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx31(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )
    }, props)
  );
};
DialogHeader.displayName = "DialogHeader";
var DialogFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx31(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React15.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx31(
    DialogPrimitive.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )
    }, props)
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React15.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx31(
    DialogPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/actions/Dialog/Dialog.tsx
import { useRef as useRef2 } from "react";
import { jsx as jsx32, jsxs as jsxs18 } from "react/jsx-runtime";
function Dialog2(_a) {
  var _b = _a, {
    title,
    description,
    className,
    children,
    footer = () => null
  } = _b, props = __objRest(_b, [
    "title",
    "description",
    "className",
    "children",
    "footer"
  ]);
  return /* @__PURE__ */ jsx32(Dialog, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ jsxs18(DialogContent, { className, children: [
    /* @__PURE__ */ jsxs18(DialogHeader, { children: [
      title && /* @__PURE__ */ jsx32(DialogTitle, { children: title }),
      description && /* @__PURE__ */ jsx32(DialogDescription, { children: description })
    ] }),
    children,
    footer && /* @__PURE__ */ jsx32(DialogFooter, { children: footer() })
  ] }) }));
}
var DialogWithForm = (_a) => {
  var _b = _a, {
    title,
    description,
    className,
    children,
    footer = () => null,
    onSubmit = () => {
    }
  } = _b, props = __objRest(_b, [
    "title",
    "description",
    "className",
    "children",
    "footer",
    "onSubmit"
  ]);
  const dialogRef = useRef2(null);
  return /* @__PURE__ */ jsx32(Dialog, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ jsx32(DialogContent, { className, ref: dialogRef, children: /* @__PURE__ */ jsxs18("form", { onSubmit, className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs18(DialogHeader, { children: [
      title && /* @__PURE__ */ jsx32(DialogTitle, { children: title }),
      description && /* @__PURE__ */ jsx32(DialogDescription, { children: description })
    ] }),
    children,
    footer && /* @__PURE__ */ jsx32(DialogFooter, { children: /* @__PURE__ */ jsxs18("div", { className: "flex justify-between w-full", children: [
      /* @__PURE__ */ jsx32(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx32(Button2, { type: "button", variant: "secondary", children: "Fechar" }) }),
      footer()
    ] }) })
  ] }) }) }));
};

// src/components/ui/collapsible.tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger;
var CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;

// src/components/actions/Steps/Steps.tsx
import { useCallback as useCallback8 } from "react";

// src/components/ui/drawer.tsx
import * as React16 from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { jsx as jsx33, jsxs as jsxs19 } from "react/jsx-runtime";
var Drawer = (_a) => {
  var _b = _a, { shouldScaleBackground = true } = _b, props = __objRest(_b, ["shouldScaleBackground"]);
  return /* @__PURE__ */ jsx33(
    DrawerPrimitive.Root,
    __spreadValues({
      shouldScaleBackground
    }, props)
  );
};
Drawer.displayName = "Drawer";
var DrawerTrigger = DrawerPrimitive.Trigger;
var DrawerPortal = DrawerPrimitive.Portal;
var DrawerClose = DrawerPrimitive.Close;
var DrawerOverlay = React16.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx33(
    DrawerPrimitive.Overlay,
    __spreadValues({
      ref,
      className: cn("fixed inset-0 z-50 bg-black/80", className)
    }, props)
  );
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
var DrawerContent = React16.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs19(DrawerPortal, { children: [
    /* @__PURE__ */ jsx33(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs19(
      DrawerPrimitive.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
          className
        )
      }, props), {
        children: [
          /* @__PURE__ */ jsx33("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }),
          children
        ]
      })
    )
  ] });
});
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx33(
    "div",
    __spreadValues({
      className: cn("grid gap-1.5 p-4 text-center sm:text-left", className)
    }, props)
  );
};
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx33(
    "div",
    __spreadValues({
      className: cn("mt-auto flex flex-col gap-2 p-4", className)
    }, props)
  );
};
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = React16.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx33(
    DrawerPrimitive.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )
    }, props)
  );
});
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
var DrawerDescription = React16.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx33(
    DrawerPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

// src/components/layout/Drawer/CustomDrawer/index.tsx
import { jsx as jsx34 } from "react/jsx-runtime";
function CustomDrawer(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx34(Drawer, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ jsx34(DrawerContent, { className, children: props.children }) }));
}

// src/components/ui/sheet.tsx
import * as React17 from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva as cva7 } from "class-variance-authority";
import { X as X3 } from "lucide-react";
import { jsx as jsx35, jsxs as jsxs20 } from "react/jsx-runtime";
var Sheet = SheetPrimitive.Root;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React17.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx35(
    SheetPrimitive.Overlay,
    __spreadProps(__spreadValues({
      className: cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props), {
      ref
    })
  );
});
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva7(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = React17.forwardRef((_a, ref) => {
  var _b = _a, { side = "right", className, children } = _b, props = __objRest(_b, ["side", "className", "children"]);
  return /* @__PURE__ */ jsxs20(SheetPortal, { children: [
    /* @__PURE__ */ jsx35(SheetOverlay, {}),
    /* @__PURE__ */ jsxs20(
      SheetPrimitive.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(sheetVariants({ side }), className)
      }, props), {
        children: [
          /* @__PURE__ */ jsxs20(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ jsx35(X3, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx35("span", { className: "sr-only", children: "Close" })
          ] }),
          children
        ]
      })
    )
  ] });
});
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx35(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )
    }, props)
  );
};
SheetHeader.displayName = "SheetHeader";
var SheetFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx35(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React17.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx35(
    SheetPrimitive.Title,
    __spreadValues({
      ref,
      className: cn("text-lg font-semibold text-foreground", className)
    }, props)
  );
});
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React17.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx35(
    SheetPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// src/components/layout/Sheet/Sheet.tsx
import { jsx as jsx36 } from "react/jsx-runtime";
function Sheet2(_a) {
  var _b = _a, { side, className, children } = _b, props = __objRest(_b, ["side", "className", "children"]);
  return /* @__PURE__ */ jsx36(Sheet, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ jsx36(SheetContent, { side, className, children }) }));
}

// src/components/ui/sidebar.tsx
import * as React21 from "react";
import { Slot as Slot3 } from "@radix-ui/react-slot";
import { cva as cva8 } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

// src/hooks/use-mobile.tsx
import * as React18 from "react";
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React18.useState(void 0);
  React18.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}

// src/components/ui/separator.tsx
import * as React19 from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx as jsx37 } from "react/jsx-runtime";
var Separator3 = React19.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, orientation = "horizontal", decorative = true } = _b, props = __objRest(_b, ["className", "orientation", "decorative"]);
    return /* @__PURE__ */ jsx37(
      SeparatorPrimitive.Root,
      __spreadValues({
        ref,
        decorative,
        orientation,
        className: cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )
      }, props)
    );
  }
);
Separator3.displayName = SeparatorPrimitive.Root.displayName;

// src/components/ui/skeleton.tsx
import { jsx as jsx38 } from "react/jsx-runtime";
function Skeleton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx38(
    "div",
    __spreadValues({
      className: cn("animate-pulse rounded-md bg-primary/10", className)
    }, props)
  );
}

// src/components/ui/tooltip.tsx
import * as React20 from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx39 } from "react/jsx-runtime";
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React20.forwardRef((_a, ref) => {
  var _b = _a, { className, sideOffset = 4 } = _b, props = __objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ jsx39(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx39(
    TooltipPrimitive.Content,
    __spreadValues({
      ref,
      sideOffset,
      className: cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  ) });
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// src/components/ui/sidebar.tsx
import { jsx as jsx40, jsxs as jsxs21 } from "react/jsx-runtime";
var SIDEBAR_COOKIE_NAME = "sidebar:state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React21.createContext(null);
function useSidebar() {
  const context = React21.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
var SidebarProvider = React21.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children
    } = _b, props = __objRest(_b, [
      "defaultOpen",
      "open",
      "onOpenChange",
      "className",
      "style",
      "children"
    ]);
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React21.useState(false);
    const [_open, _setOpen] = React21.useState(defaultOpen);
    const open = openProp != null ? openProp : _open;
    const setOpen = React21.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );
    const toggleSidebar = React21.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [isMobile, setOpen, setOpenMobile]);
    React21.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = React21.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsx40(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx40(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx40(
      "div",
      __spreadProps(__spreadValues({
        style: __spreadValues({
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON
        }, style),
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref
      }, props), {
        children
      })
    ) }) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = React21.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children
    } = _b, props = __objRest(_b, [
      "side",
      "variant",
      "collapsible",
      "className",
      "children"
    ]);
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsx40(
        "div",
        __spreadProps(__spreadValues({
          className: cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          ref
        }, props), {
          children
        })
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsx40(Sheet, __spreadProps(__spreadValues({ open: openMobile, onOpenChange: setOpenMobile }, props), { children: /* @__PURE__ */ jsx40(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: /* @__PURE__ */ jsx40("div", { className: "flex h-full w-full flex-col", children })
        }
      ) }));
    }
    return /* @__PURE__ */ jsxs21(
      "div",
      {
        ref,
        className: "group peer hidden md:block text-sidebar-foreground",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsx40(
            "div",
            {
              className: cn(
                "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
              )
            }
          ),
          /* @__PURE__ */ jsx40(
            "div",
            __spreadProps(__spreadValues({
              className: cn(
                "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              )
            }, props), {
              children: /* @__PURE__ */ jsx40(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                }
              )
            })
          )
        ]
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
var SidebarTrigger = React21.forwardRef((_a, ref) => {
  var _b = _a, { className, onClick } = _b, props = __objRest(_b, ["className", "onClick"]);
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs21(
    Button,
    __spreadProps(__spreadValues({
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      }
    }, props), {
      children: [
        /* @__PURE__ */ jsx40(PanelLeft, {}),
        /* @__PURE__ */ jsx40("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    })
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx40(
    "button",
    __spreadValues({
      ref,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )
    }, props)
  );
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "main",
    __spreadValues({
      ref,
      className: cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )
    }, props)
  );
});
SidebarInset.displayName = "SidebarInset";
var SidebarInput = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    Input,
    __spreadValues({
      ref,
      "data-sidebar": "input",
      className: cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )
    }, props)
  );
});
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "div",
    __spreadValues({
      ref,
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className)
    }, props)
  );
});
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "div",
    __spreadValues({
      ref,
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className)
    }, props)
  );
});
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    Separator3,
    __spreadValues({
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className)
    }, props)
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "div",
    __spreadValues({
      ref,
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )
    }, props)
  );
});
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "div",
    __spreadValues({
      ref,
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className)
    }, props)
  );
});
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = React21.forwardRef((_a, ref) => {
  var _b = _a, { className, asChild = false } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot3 : "div";
  return /* @__PURE__ */ jsx40(
    Comp,
    __spreadValues({
      ref,
      "data-sidebar": "group-label",
      className: cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )
    }, props)
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = React21.forwardRef((_a, ref) => {
  var _b = _a, { className, asChild = false } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot3 : "button";
  return /* @__PURE__ */ jsx40(
    Comp,
    __spreadValues({
      ref,
      "data-sidebar": "group-action",
      className: cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "div",
    __spreadValues({
      ref,
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className)
    }, props)
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "ul",
    __spreadValues({
      ref,
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className)
    }, props)
  );
});
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "li",
    __spreadValues({
      ref,
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className)
    }, props)
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = cva8(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var SidebarMenuButton = React21.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className
    } = _b, props = __objRest(_b, [
      "asChild",
      "isActive",
      "variant",
      "size",
      "tooltip",
      "className"
    ]);
    const Comp = asChild ? Slot3 : "button";
    const { isMobile, state } = useSidebar();
    const button = /* @__PURE__ */ jsx40(
      Comp,
      __spreadValues({
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className)
      }, props)
    );
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return /* @__PURE__ */ jsxs21(Tooltip, { children: [
      /* @__PURE__ */ jsx40(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ jsx40(
        TooltipContent,
        __spreadValues({
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile
        }, tooltip)
      )
    ] });
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = React21.forwardRef((_a, ref) => {
  var _b = _a, { className, asChild = false, showOnHover = false } = _b, props = __objRest(_b, ["className", "asChild", "showOnHover"]);
  const Comp = asChild ? Slot3 : "button";
  return /* @__PURE__ */ jsx40(
    Comp,
    __spreadValues({
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )
    }, props)
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "div",
    __spreadValues({
      ref,
      "data-sidebar": "menu-badge",
      className: cn(
        "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = React21.forwardRef((_a, ref) => {
  var _b = _a, { className, showIcon = false } = _b, props = __objRest(_b, ["className", "showIcon"]);
  const width = React21.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxs21(
    "div",
    __spreadProps(__spreadValues({
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("rounded-md h-8 flex gap-2 px-2 items-center", className)
    }, props), {
      children: [
        showIcon && /* @__PURE__ */ jsx40(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsx40(
          Skeleton,
          {
            className: "h-4 flex-1 max-w-[--skeleton-width]",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    })
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx40(
    "ul",
    __spreadValues({
      ref,
      "data-sidebar": "menu-sub",
      className: cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
});
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = React21.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx40("li", __spreadValues({ ref }, props));
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = React21.forwardRef((_a, ref) => {
  var _b = _a, { asChild = false, size = "md", isActive, className } = _b, props = __objRest(_b, ["asChild", "size", "isActive", "className"]);
  const Comp = asChild ? Slot3 : "a";
  return /* @__PURE__ */ jsx40(
    Comp,
    __spreadValues({
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// src/components/layout/Sidebar/components/app-sidebar.tsx
import { GalleryVerticalEnd } from "lucide-react";

// src/components/layout/Sidebar/components/team-switcher.tsx
import { ChevronsUpDown } from "lucide-react";
import { jsx as jsx41, jsxs as jsxs22 } from "react/jsx-runtime";
function TeamSwitcher({
  teams
}) {
  const { isMobile } = useSidebar();
  return /* @__PURE__ */ jsx41(SidebarMenu, { children: /* @__PURE__ */ jsx41(SidebarMenuItem, { children: /* @__PURE__ */ jsx41(DropdownMenu, { children: /* @__PURE__ */ jsx41(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs22(
    SidebarMenuButton,
    {
      size: "lg",
      className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
      children: [
        /* @__PURE__ */ jsx41("div", { className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground" }),
        /* @__PURE__ */ jsxs22("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
          /* @__PURE__ */ jsx41("span", { className: "truncate font-semibold", children: teams == null ? void 0 : teams.name }),
          /* @__PURE__ */ jsx41("span", { className: "truncate text-xs", children: teams == null ? void 0 : teams.plan })
        ] }),
        /* @__PURE__ */ jsx41(ChevronsUpDown, { className: "ml-auto" })
      ]
    }
  ) }) }) }) });
}

// src/components/layout/Sidebar/components/menus.tsx
import { Fragment as Fragment3, jsx as jsx42, jsxs as jsxs23 } from "react/jsx-runtime";
function Menus({
  items
}) {
  return /* @__PURE__ */ jsx42(Fragment3, { children: items.map((item, index) => {
    var _a;
    return /* @__PURE__ */ jsxs23(SidebarGroup, { children: [
      /* @__PURE__ */ jsx42(SidebarGroupLabel, { children: item.title }),
      /* @__PURE__ */ jsx42(SidebarMenu, { children: (_a = item.items) == null ? void 0 : _a.map((subItem) => /* @__PURE__ */ jsx42(SidebarMenuItem, { children: /* @__PURE__ */ jsx42(
        SidebarMenuButton,
        {
          asChild: true,
          className: cn(
            (subItem == null ? void 0 : subItem.isActive) && "bg-sidebar-accent font-semibold"
          ),
          children: /* @__PURE__ */ jsxs23("a", { href: subItem.url, children: [
            (subItem == null ? void 0 : subItem.icon) && subItem.icon(),
            /* @__PURE__ */ jsx42("span", { children: subItem.title })
          ] })
        }
      ) }, subItem.title)) })
    ] }, index);
  }) });
}

// src/components/layout/Sidebar/components/app-sidebar.tsx
import { jsx as jsx43, jsxs as jsxs24 } from "react/jsx-runtime";
function AppSidebar(_a) {
  var _b = _a, {
    navbar = [],
    enterprise = {
      name: "Acme Inc",
      logo: () => /* @__PURE__ */ jsx43(GalleryVerticalEnd, {}),
      plan: "Enterprise"
    },
    footer
  } = _b, props = __objRest(_b, [
    "navbar",
    "enterprise",
    "footer"
  ]);
  return /* @__PURE__ */ jsxs24(Sidebar, __spreadProps(__spreadValues({ collapsible: "icon" }, props), { children: [
    /* @__PURE__ */ jsx43(SidebarHeader, { children: /* @__PURE__ */ jsx43(TeamSwitcher, { teams: enterprise }) }),
    /* @__PURE__ */ jsx43(SidebarContent, { children: /* @__PURE__ */ jsx43(Menus, { items: navbar }) }),
    footer && /* @__PURE__ */ jsx43(SidebarFooter, { children: footer() }),
    /* @__PURE__ */ jsx43(SidebarRail, {})
  ] }));
}

// src/components/ui/breadcrumb.tsx
import * as React22 from "react";
import { Slot as Slot4 } from "@radix-ui/react-slot";
import { ChevronRight as ChevronRight2, MoreHorizontal } from "lucide-react";
import { jsx as jsx44, jsxs as jsxs25 } from "react/jsx-runtime";
var Breadcrumb = React22.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx44("nav", __spreadValues({ ref, "aria-label": "breadcrumb" }, props));
});
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React22.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx44(
    "ol",
    __spreadValues({
      ref,
      className: cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )
    }, props)
  );
});
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React22.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx44(
    "li",
    __spreadValues({
      ref,
      className: cn("inline-flex items-center gap-1.5", className)
    }, props)
  );
});
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React22.forwardRef((_a, ref) => {
  var _b = _a, { asChild, className } = _b, props = __objRest(_b, ["asChild", "className"]);
  const Comp = asChild ? Slot4 : "a";
  return /* @__PURE__ */ jsx44(
    Comp,
    __spreadValues({
      ref,
      className: cn("transition-colors hover:text-foreground", className)
    }, props)
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = React22.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx44(
    "span",
    __spreadValues({
      ref,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("font-normal text-foreground", className)
    }, props)
  );
});
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = (_a) => {
  var _b = _a, {
    children,
    className
  } = _b, props = __objRest(_b, [
    "children",
    "className"
  ]);
  return /* @__PURE__ */ jsx44(
    "li",
    __spreadProps(__spreadValues({
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)
    }, props), {
      children: children != null ? children : /* @__PURE__ */ jsx44(ChevronRight2, {})
    })
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxs25(
    "span",
    __spreadProps(__spreadValues({
      role: "presentation",
      "aria-hidden": "true",
      className: cn("flex h-9 w-9 items-center justify-center", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsx44(MoreHorizontal, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx44("span", { className: "sr-only", children: "More" })
      ]
    })
  );
};
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

// src/components/layout/Sidebar/provider/index.tsx
import { createContext as createContext3, useContext as useContext3, useState as useState7 } from "react";
import { jsx as jsx45 } from "react/jsx-runtime";
var SidebarContext2 = createContext3({});
function SidebarProvider2({
  children,
  defaultPath = "/",
  defaultCollapsed = false
}) {
  const [isCollapsed, setIsCollapsed] = useState7(defaultCollapsed);
  const [currentPath, setCurrentPath] = useState7(defaultPath);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  return /* @__PURE__ */ jsx45(
    SidebarContext2.Provider,
    {
      value: {
        currentPath,
        isCollapsed,
        toggleCollapse,
        setCurrentPath
      },
      children
    }
  );
}
function useSidebar2() {
  const context = useContext3(SidebarContext2);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// src/components/layout/Sidebar/components/header-sidebar.tsx
import { jsx as jsx46, jsxs as jsxs26 } from "react/jsx-runtime";
var routeMap = {
  dashboard: "Dashboard",
  users: "Usu\xE1rios",
  documents: "Documentos",
  settings: "Configura\xE7\xF5es",
  create: "Criar",
  edit: "Editar",
  profile: "Perfil",
  analytics: "An\xE1lises",
  reports: "Relat\xF3rios"
};
var BreadcrumbElement = ({ isLast, path, label }) => {
  if (isLast) {
    return /* @__PURE__ */ jsx46(BreadcrumbItem, { children: /* @__PURE__ */ jsx46(BreadcrumbPage, { className: "capitalize", children: label }) });
  }
  return /* @__PURE__ */ jsxs26(BreadcrumbItem, { children: [
    /* @__PURE__ */ jsx46(BreadcrumbLink, { href: path, className: "capitalize", children: label }),
    /* @__PURE__ */ jsx46(BreadcrumbSeparator, {})
  ] });
};
var HeaderSidebar = () => {
  const { currentPath } = useSidebar2();
  const breadcrumbItems = currentPath.split("/").filter(Boolean).map((segment, index, array) => {
    const path = `/${array.slice(0, index + 1).join("/")}`;
    const isLast = index === array.length - 1;
    const label = routeMap[segment] || segment;
    return {
      path,
      label,
      isLast
    };
  });
  return /* @__PURE__ */ jsx46("header", { className: "flex h-16 shrink-0 items-center border-b border-border bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12", children: /* @__PURE__ */ jsxs26("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx46(SidebarTrigger, { className: "-ml-2 h-9 w-9" }),
    /* @__PURE__ */ jsx46(Separator3, { orientation: "vertical", className: "h-6" }),
    /* @__PURE__ */ jsx46(Breadcrumb, { children: /* @__PURE__ */ jsxs26(BreadcrumbList, { children: [
      /* @__PURE__ */ jsxs26(BreadcrumbItem, { children: [
        /* @__PURE__ */ jsx46(BreadcrumbLink, { href: "/", className: "capitalize", children: "Home" }),
        /* @__PURE__ */ jsx46(BreadcrumbSeparator, {})
      ] }),
      breadcrumbItems.map((item) => /* @__PURE__ */ jsx46(BreadcrumbElement, __spreadValues({}, item), item.path))
    ] }) })
  ] }) });
};

// src/components/layout/Sidebar/components/footer-sidebar.tsx
import { jsx as jsx47, jsxs as jsxs27 } from "react/jsx-runtime";
var FooterSidebar = () => {
  return /* @__PURE__ */ jsxs27("footer", { className: "h-[65px]", children: [
    /* @__PURE__ */ jsx47(Separator3, {}),
    /* @__PURE__ */ jsxs27("div", { className: "flex items-center justify-between h-16 bg-background px-5", children: [
      /* @__PURE__ */ jsxs27("span", { className: "text-sm text-muted-foreground", children: [
        "\xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Your Company"
      ] }),
      /* @__PURE__ */ jsx47("span", { className: "text-sm text-muted-foreground", children: "Feito na terra do sol \u{1F31E}" })
    ] })
  ] });
};

// src/components/layout/Sidebar/Sidebar.tsx
import { jsx as jsx48, jsxs as jsxs28 } from "react/jsx-runtime";
var Sidebar2 = (_a) => {
  var _b = _a, {
    children,
    contentClassName,
    showFooter = true,
    defaultPath,
    defaultCollapsed
  } = _b, rest = __objRest(_b, [
    "children",
    "contentClassName",
    "showFooter",
    "defaultPath",
    "defaultCollapsed"
  ]);
  return /* @__PURE__ */ jsx48(
    SidebarProvider2,
    {
      defaultPath,
      defaultCollapsed,
      children: /* @__PURE__ */ jsxs28(SidebarProvider, { children: [
        /* @__PURE__ */ jsx48(AppSidebar, __spreadValues({}, rest)),
        /* @__PURE__ */ jsxs28(SidebarInset, { className: "overflow-auto bg-slate-50", children: [
          /* @__PURE__ */ jsx48(HeaderSidebar, {}),
          /* @__PURE__ */ jsx48(
            "main",
            {
              className: cn(
                "flex flex-1 flex-col gap-4 p-4 pt-0",
                contentClassName
              ),
              children
            }
          ),
          showFooter && /* @__PURE__ */ jsx48(FooterSidebar, {})
        ] })
      ] })
    }
  );
};

// src/components/layout/Sidebar/components/nav-user.tsx
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown as ChevronsUpDown2,
  CreditCard,
  LogOut,
  Sparkles
} from "lucide-react";
import { useCallback as useCallback7 } from "react";
import { Fragment as Fragment4, jsx as jsx49, jsxs as jsxs29 } from "react/jsx-runtime";
function NavUser({
  user,
  logoutAction = () => {
  }
}) {
  const { isMobile } = useSidebar();
  const renderUserInformation = useCallback7(() => {
    return /* @__PURE__ */ jsxs29(Fragment4, { children: [
      /* @__PURE__ */ jsxs29(Avatar, { className: "h-8 w-8 rounded-lg", children: [
        /* @__PURE__ */ jsx49(AvatarImage, { src: user == null ? void 0 : user.avatar, alt: user == null ? void 0 : user.name }),
        /* @__PURE__ */ jsx49(AvatarFallback, { className: "rounded-lg", children: "CN" })
      ] }),
      /* @__PURE__ */ jsxs29("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
        /* @__PURE__ */ jsx49("span", { className: "truncate font-semibold", children: user == null ? void 0 : user.name }),
        /* @__PURE__ */ jsx49("span", { className: "truncate text-xs", children: user == null ? void 0 : user.email })
      ] })
    ] });
  }, [user]);
  return /* @__PURE__ */ jsx49(SidebarMenu, { children: /* @__PURE__ */ jsx49(SidebarMenuItem, { children: /* @__PURE__ */ jsxs29(DropdownMenu, { children: [
    /* @__PURE__ */ jsx49(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs29(
      SidebarMenuButton,
      {
        size: "lg",
        className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
        children: [
          renderUserInformation(),
          /* @__PURE__ */ jsx49(ChevronsUpDown2, { className: "ml-auto size-4" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs29(
      DropdownMenuContent,
      {
        className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
        side: isMobile ? "bottom" : "right",
        align: "end",
        sideOffset: 4,
        children: [
          /* @__PURE__ */ jsx49(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsx49("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: renderUserInformation() }) }),
          /* @__PURE__ */ jsx49(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx49(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs29(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx49(Sparkles, {}),
            "Upgrade to Pro"
          ] }) }),
          /* @__PURE__ */ jsx49(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs29(DropdownMenuGroup, { children: [
            /* @__PURE__ */ jsxs29(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx49(BadgeCheck, {}),
              "Account"
            ] }),
            /* @__PURE__ */ jsxs29(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx49(CreditCard, {}),
              "Billing"
            ] }),
            /* @__PURE__ */ jsxs29(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx49(Bell, {}),
              "Notifications"
            ] })
          ] }),
          /* @__PURE__ */ jsx49(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs29(DropdownMenuItem, { onClick: logoutAction, children: [
            /* @__PURE__ */ jsx49(LogOut, {}),
            "Log out"
          ] })
        ]
      }
    )
  ] }) }) });
}

// src/components/layout/PageLayout/index.tsx
import { jsx as jsx50, jsxs as jsxs30 } from "react/jsx-runtime";
var PageLayout = ({
  subtitle,
  title,
  children,
  header
}) => {
  return /* @__PURE__ */ jsxs30("div", { className: "m-5 p-4 bg-white", children: [
    /* @__PURE__ */ jsxs30("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxs30("div", { children: [
        title && /* @__PURE__ */ jsx50(Text, { variant: "title", children: title }),
        subtitle && /* @__PURE__ */ jsx50(Text, { variant: "muted", children: subtitle })
      ] }),
      header
    ] }),
    /* @__PURE__ */ jsx50("div", { className: "mt-5", children })
  ] });
};

// src/components/ui/tabs.tsx
import * as React23 from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { jsx as jsx51 } from "react/jsx-runtime";
var Tabs = TabsPrimitive.Root;
var TabsList = React23.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx51(
    TabsPrimitive.List,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )
    }, props)
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React23.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx51(
    TabsPrimitive.Trigger,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className
      )
    }, props)
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React23.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx51(
    TabsPrimitive.Content,
    __spreadValues({
      ref,
      className: cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )
    }, props)
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

// src/components/layout/Tabs/Tabs.tsx
import { jsx as jsx52, jsxs as jsxs31 } from "react/jsx-runtime";
var Tabs2 = ({
  tabs,
  activeTabIndex = 0,
  onTabChange,
  className
}) => {
  return /* @__PURE__ */ jsxs31(
    Tabs,
    {
      value: tabs[activeTabIndex].label,
      onValueChange: (value) => {
        const index = tabs.findIndex((tab) => tab.label === value);
        if (onTabChange) onTabChange(index);
      },
      className: cn("w-full", className),
      children: [
        /* @__PURE__ */ jsx52(TabsList, { children: tabs.map((tab, index) => /* @__PURE__ */ jsx52(TabsTrigger, { value: tab.label, children: tab.label }, index)) }),
        tabs.map((tab, index) => /* @__PURE__ */ jsx52(TabsContent, { value: tab.label, children: tab.content }, index))
      ]
    }
  );
};

// src/components/actions/Steps/Steps.tsx
import { jsx as jsx53, jsxs as jsxs32 } from "react/jsx-runtime";
var Steps = ({ data, onClick = () => {
}, value }) => {
  const renderSteps = useCallback8(() => {
    return data.map(({ label, id }, index) => {
      const isLast = index === data.length - 1;
      const isActive = typeof value === "number" && id <= value;
      return /* @__PURE__ */ jsxs32("div", { className: cn(!isLast && "w-full flex items-center"), children: [
        /* @__PURE__ */ jsx53("div", { children: /* @__PURE__ */ jsx53(
          Button2,
          {
            onClick: () => onClick && onClick(id),
            variant: isActive ? "default" : "outline",
            size: "icon",
            className: "rounded-full",
            children: isActive ? /* @__PURE__ */ jsx53(Icon2, { name: "MdCheck" }) : index + 1
          }
        ) }),
        label && /* @__PURE__ */ jsx53("p", { className: "absolute", children: label }),
        !isLast && /* @__PURE__ */ jsx53(
          Separator3,
          {
            orientation: "horizontal",
            className: cn(isActive && "bg-primary h-[2px]")
          }
        )
      ] }, index);
    });
  }, [data, onClick, value]);
  return /* @__PURE__ */ jsx53("div", { className: "flex w-full", children: renderSteps() });
};

// src/components/ui/alert-dialog.tsx
import * as React24 from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { jsx as jsx54, jsxs as jsxs33 } from "react/jsx-runtime";
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React24.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    AlertDialogPrimitive.Overlay,
    __spreadProps(__spreadValues({
      className: cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props), {
      ref
    })
  );
});
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React24.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxs33(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx54(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx54(
      AlertDialogPrimitive.Content,
      __spreadValues({
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )
      }, props)
    )
  ] });
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx54(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )
    }, props)
  );
};
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx54(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React24.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    AlertDialogPrimitive.Title,
    __spreadValues({
      ref,
      className: cn("text-lg font-semibold", className)
    }, props)
  );
});
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React24.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    AlertDialogPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React24.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    AlertDialogPrimitive.Action,
    __spreadValues({
      ref,
      className: cn(buttonVariants(), className)
    }, props)
  );
});
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React24.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    AlertDialogPrimitive.Cancel,
    __spreadValues({
      ref,
      className: cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )
    }, props)
  );
});
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// src/components/actions/AlertDialog/AlertDialog.tsx
import { jsx as jsx55, jsxs as jsxs34 } from "react/jsx-runtime";
var AlertDialog2 = ({
  title,
  description,
  children,
  onConfirm,
  onCancel
}) => {
  return /* @__PURE__ */ jsxs34(AlertDialog, { children: [
    /* @__PURE__ */ jsx55(AlertDialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs34(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs34(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx55(AlertDialogTitle, { children: title }),
        description && /* @__PURE__ */ jsx55(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxs34(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx55(AlertDialogCancel, { onClick: onCancel, children: "Cancel" }),
        /* @__PURE__ */ jsx55(AlertDialogAction, { onClick: onConfirm, children: "Continue" })
      ] })
    ] })
  ] });
};

// src/components/dataInput/Input/components/MultipleInput/MultipleInputBase.tsx
import { useCallback as useCallback9, useMemo as useMemo9, useState as useState8 } from "react";
import { useFormContext as useFormContext5 } from "react-hook-form";
import _ from "lodash";
import { jsx as jsx56, jsxs as jsxs35 } from "react/jsx-runtime";
var MultipleInputBase = ({
  children,
  data = [],
  name,
  onChangeData = () => {
  },
  error
}) => {
  const form = useFormContext5();
  const withForm = !!form && !!name;
  const [inputValue, setInputValue] = useState8("");
  const inputData = useMemo9(() => {
    if (withForm) {
      return _.get(form.watch(), name) || [];
    }
    return data;
  }, [withForm, form, name, data]);
  const errorMessage = useMemo9(() => {
    var _a;
    if (withForm) {
      return (_a = _.get(form.formState.errors, name)) == null ? void 0 : _a.message;
    }
    return error;
  }, [error, form, name, withForm]);
  const updateData = useCallback9(() => {
    if (!inputValue.length) return;
    if (withForm) {
      form.setValue(name, [...inputData, inputValue]);
    } else {
      onChangeData == null ? void 0 : onChangeData(inputData.concat(inputValue));
    }
    setInputValue("");
  }, [inputData, inputValue, withForm, form, name, onChangeData]);
  const removeItem = useCallback9(
    (index) => {
      if (withForm) {
        form.setValue(
          name,
          inputData.filter((_2, i) => i !== index)
        );
      } else {
        onChangeData == null ? void 0 : onChangeData(inputData.filter((_2, i) => i !== index));
      }
    },
    [withForm, form, name, inputData, onChangeData]
  );
  const renderOptions = useCallback9(() => {
    return inputData == null ? void 0 : inputData.map((item, index) => {
      return /* @__PURE__ */ jsxs35("div", { className: "flex justify-between mt-2", children: [
        /* @__PURE__ */ jsx56("div", { children: item }),
        /* @__PURE__ */ jsx56(
          Button2,
          {
            onClick: () => removeItem(index),
            variant: "ghost",
            size: "icon",
            type: "button",
            children: /* @__PURE__ */ jsx56(Icon2, { name: "MdDelete", className: "fill-destructive" })
          }
        )
      ] }, index);
    });
  }, [inputData, removeItem]);
  return /* @__PURE__ */ jsxs35("div", { children: [
    children({
      onChange: ({ target: { value } }) => {
        setInputValue(value);
      },
      addItem: updateData,
      value: inputValue,
      error: errorMessage
    }),
    renderOptions()
  ] });
};

// src/components/dataInput/Input/components/MultipleInput/MultipleMaskInput.tsx
import { jsx as jsx57 } from "react/jsx-runtime";
var MultipleMaskInput = (_a) => {
  var _b = _a, {
    data = []
  } = _b, props = __objRest(_b, [
    "data"
  ]);
  return /* @__PURE__ */ jsx57(MultipleInputBase, __spreadProps(__spreadValues({ data }, props), { children: ({ onChange, addItem, value }) => {
    return /* @__PURE__ */ jsx57(
      MaskInput,
      __spreadProps(__spreadValues({}, props), {
        value,
        onChange,
        withoutForm: true,
        component: /* @__PURE__ */ jsx57(Button2, { type: "button", onClick: () => addItem(), children: /* @__PURE__ */ jsx57(Icon2, { name: "MdAdd" }) })
      })
    );
  } }));
};

// src/components/dataInput/Select/SelectBase.tsx
import { useCallback as useCallback10 } from "react";
import { jsx as jsx58, jsxs as jsxs36 } from "react/jsx-runtime";
var SelectBase = (_a) => {
  var _b = _a, {
    options,
    placeholder,
    onChange = () => {
    },
    onChangeCallback = () => {
    },
    value
  } = _b, rest = __objRest(_b, [
    "options",
    "placeholder",
    "onChange",
    "onChangeCallback",
    "value"
  ]);
  const onSelect = useCallback10(
    (value2) => {
      onChange(value2);
      onChangeCallback(value2);
    },
    [onChange, onChangeCallback]
  );
  return /* @__PURE__ */ jsxs36(
    Select,
    __spreadProps(__spreadValues({}, rest), {
      onValueChange: onSelect,
      defaultValue: value,
      value,
      children: [
        /* @__PURE__ */ jsx58(SelectTrigger, { children: /* @__PURE__ */ jsx58(SelectValue, { placeholder }) }),
        /* @__PURE__ */ jsx58(SelectContent, { children: options == null ? void 0 : options.map((option, index) => /* @__PURE__ */ jsx58(SelectItem, { value: String(option.value), children: option.label }, index)) })
      ]
    })
  );
};

// src/components/dataInput/Select/Select.tsx
import { useFormContext as useFormContext6 } from "react-hook-form";
import { jsx as jsx59, jsxs as jsxs37 } from "react/jsx-runtime";
var Select2 = (_a) => {
  var _b = _a, {
    name,
    label,
    description,
    error,
    className,
    withoutForm,
    options,
    placeholder
  } = _b, props = __objRest(_b, [
    "name",
    "label",
    "description",
    "error",
    "className",
    "withoutForm",
    "options",
    "placeholder"
  ]);
  const form = useFormContext6();
  const hasForm = !!form && !!name;
  if (!hasForm || withoutForm) {
    return /* @__PURE__ */ jsxs37("div", { className: cn("space-y-2", className), children: [
      label && /* @__PURE__ */ jsx59(Label3, { children: label }),
      /* @__PURE__ */ jsx59(SelectBase, __spreadValues({ options, placeholder }, props)),
      description && /* @__PURE__ */ jsx59("p", { className: "text-sm text-muted-foreground", children: description }),
      error && /* @__PURE__ */ jsx59(ErrorMessage, { children: error })
    ] });
  }
  return /* @__PURE__ */ jsx59(
    FormField,
    {
      control: form.control,
      name,
      render: ({ field }) => /* @__PURE__ */ jsxs37(FormItem, { className, children: [
        label && /* @__PURE__ */ jsx59(FormLabel, { children: label }),
        /* @__PURE__ */ jsx59(FormControl, { children: /* @__PURE__ */ jsx59(
          SelectBase,
          __spreadValues(__spreadValues({
            options,
            placeholder
          }, props), field)
        ) }),
        description && /* @__PURE__ */ jsx59(FormDescription, { children: description }),
        /* @__PURE__ */ jsx59(FormMessage, {})
      ] })
    }
  );
};

// src/components/dataDisplay/Label/Label.tsx
import { jsx as jsx60 } from "react/jsx-runtime";
var Label4 = (props) => {
  return /* @__PURE__ */ jsx60(Label3, __spreadValues({}, props));
};

// src/components/dataInput/Select/MultiSelect/MultiSelectBase.tsx
import * as React25 from "react";
import { Search, X as X4 } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { jsx as jsx61, jsxs as jsxs38 } from "react/jsx-runtime";
function MultiSelectBase({
  options = [],
  selected = [],
  onChange = () => {
  },
  placeholder = "Select frameworks...",
  className
}) {
  const [open, setOpen] = React25.useState(false);
  const [inputValue, setInputValue] = React25.useState("");
  const inputRef = React25.useRef(null);
  const handleRemoveItem = (valueToRemove) => {
    onChange(selected.filter((value) => value !== valueToRemove));
  };
  const handleSelectItem = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };
  const filteredOptions = options.filter(
    (option) => option.label.toLowerCase().includes(inputValue.toLowerCase())
  );
  return /* @__PURE__ */ jsxs38(Popover.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx61(Popover.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs38(
      "div",
      {
        className: cn(
          "flex min-h-[40px] w-full flex-wrap gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className
        ),
        children: [
          selected.map((value) => {
            const option = options.find((o) => o.value === value);
            if (!option) return null;
            return /* @__PURE__ */ jsxs38(
              "div",
              {
                className: "flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground",
                children: [
                  option.label,
                  /* @__PURE__ */ jsxs38(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        handleRemoveItem(value);
                      },
                      className: "rounded-full hover:bg-secondary-foreground/20",
                      children: [
                        /* @__PURE__ */ jsx61(X4, { className: "h-3 w-3" }),
                        /* @__PURE__ */ jsxs38("span", { className: "sr-only", children: [
                          "Remove ",
                          option.label
                        ] })
                      ]
                    }
                  )
                ]
              },
              value
            );
          }),
          /* @__PURE__ */ jsx61("div", { className: "flex-1", children: selected.length === 0 && /* @__PURE__ */ jsx61("span", { className: "text-muted-foreground", children: placeholder }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx61(Popover.Portal, { children: /* @__PURE__ */ jsxs38(
      Popover.Content,
      {
        className: "w-[--radix-popover-trigger-width] z-50 mt-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        align: "start",
        sideOffset: 4,
        children: [
          /* @__PURE__ */ jsxs38("div", { className: "flex items-center border-b border-border px-3 py-2", children: [
            /* @__PURE__ */ jsx61(Search, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx61(
              "input",
              {
                ref: inputRef,
                value: inputValue,
                onChange: (e) => setInputValue(e.target.value),
                placeholder: "Search...",
                className: "flex-1 bg-transparent px-2 outline-none placeholder:text-muted-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsx61("div", { className: "max-h-[200px] overflow-auto", children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx61("div", { className: "px-2 py-4 text-center text-sm text-muted-foreground", children: "No results found." }) : filteredOptions.map((option) => /* @__PURE__ */ jsxs38(
            "div",
            {
              onClick: () => handleSelectItem(option.value),
              className: cn(
                "flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-accent",
                selected.includes(option.value) && "bg-accent"
              ),
              children: [
                /* @__PURE__ */ jsx61(
                  "div",
                  {
                    className: cn(
                      "flex h-4 w-4 items-center justify-center rounded border border-primary",
                      selected.includes(option.value) && "bg-primary text-primary-foreground"
                    ),
                    children: selected.includes(option.value) && /* @__PURE__ */ jsx61("span", { className: "text-[10px]", children: "\u2713" })
                  }
                ),
                option.label
              ]
            },
            option.value
          )) })
        ]
      }
    ) })
  ] });
}

// src/components/dataInput/Select/MultiSelect/index.tsx
import { useFormContext as useFormContext7 } from "react-hook-form";
import { jsx as jsx62, jsxs as jsxs39 } from "react/jsx-runtime";
function MultiSelect(_a) {
  var _b = _a, {
    label,
    name,
    withoutForm,
    className,
    required,
    "data-testid": testId
  } = _b, props = __objRest(_b, [
    "label",
    "name",
    "withoutForm",
    "className",
    "required",
    "data-testid"
  ]);
  const form = useFormContext7();
  const hasForm = !withoutForm && !!form && !!name;
  if (!hasForm)
    return /* @__PURE__ */ jsxs39("div", { className: "grid w-full items-center gap-3", children: [
      label && /* @__PURE__ */ jsx62(Label4, { htmlFor: name, children: label }),
      /* @__PURE__ */ jsx62(MultiSelectBase, __spreadValues({}, props))
    ] });
  return /* @__PURE__ */ jsx62(
    FormField,
    {
      control: form.control,
      name,
      render: (_a2) => {
        var { field: _b2 } = _a2, _c = _b2, { value } = _c, rest = __objRest(_c, ["value"]);
        return /* @__PURE__ */ jsxs39(
          FormItem,
          {
            className,
            "data-testid": testId ? `form-item-${testId}` : void 0,
            children: [
              label && /* @__PURE__ */ jsx62(
                FormLabel,
                {
                  htmlFor: name,
                  "data-testid": testId ? `form-label-${testId}` : void 0,
                  children: `${label}${required ? " *" : ""}`
                }
              ),
              /* @__PURE__ */ jsx62(FormControl, { children: /* @__PURE__ */ jsx62("div", { className: "flex w-full items-center space-x-2", children: /* @__PURE__ */ jsx62(MultiSelectBase, __spreadProps(__spreadValues(__spreadValues({}, props), rest), { selected: value })) }) }),
              /* @__PURE__ */ jsx62(
                FormMessage,
                {
                  role: "alert",
                  "data-testid": testId ? `form-message-${testId}` : void 0
                }
              )
            ]
          }
        );
      }
    }
  );
}

// src/components/ui/switch.tsx
import * as React26 from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { jsx as jsx63 } from "react/jsx-runtime";
var Switch = React26.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx63(
    SwitchPrimitives.Root,
    __spreadProps(__spreadValues({
      className: cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )
    }, props), {
      ref,
      children: /* @__PURE__ */ jsx63(
        SwitchPrimitives.Thumb,
        {
          className: cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
          )
        }
      )
    })
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

// src/components/dataInput/Switch/Switch.tsx
import { useFormContext as useFormContext8 } from "react-hook-form";
import { jsx as jsx64, jsxs as jsxs40 } from "react/jsx-runtime";
function Switch2(_a) {
  var _b = _a, {
    label,
    withoutForm,
    className
  } = _b, props = __objRest(_b, [
    "label",
    "withoutForm",
    "className"
  ]);
  var _a2;
  const form = useFormContext8();
  const hasForm = !!form && !withoutForm && !!props.name;
  if (!hasForm)
    return /* @__PURE__ */ jsxs40("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx64(Switch, __spreadValues({}, props)),
      label && /* @__PURE__ */ jsx64(Label3, { htmlFor: props.id, children: label })
    ] });
  return /* @__PURE__ */ jsx64(
    FormField,
    {
      control: form.control,
      name: (_a2 = props.name) != null ? _a2 : "",
      render: ({ field }) => /* @__PURE__ */ jsxs40(
        FormItem,
        {
          className: cn(className, "flex items-center space-x-2 space-y-0"),
          children: [
            /* @__PURE__ */ jsx64(FormControl, { children: /* @__PURE__ */ jsx64(Switch2, { checked: field.value, onCheckedChange: field.onChange }) }),
            /* @__PURE__ */ jsx64(FormLabel, { children: label })
          ]
        }
      )
    }
  );
}
export {
  AlertDialog2 as AlertDialog,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button2 as Button,
  Checkbox2 as Checkbox,
  Collapsible,
  CollapsibleContent2 as CollapsibleContent,
  CollapsibleTrigger2 as CollapsibleTrigger,
  CustomDrawer,
  DataPairList,
  Dialog2 as Dialog,
  DialogWithForm,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DynamicTable,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon2 as Icon,
  Input2 as Input,
  MaskInput,
  MultiSelect,
  MultipleInput,
  MultipleMaskInput,
  NavUser,
  NumberInput,
  PageLayout,
  Select2 as Select,
  Separator3 as Separator,
  Sheet2 as Sheet,
  Sidebar2 as Sidebar,
  Spinner,
  Steps,
  Switch2 as Switch,
  Tabs2 as Tabs,
  Text,
  Toaster,
  badgeVariants,
  reducer,
  toast,
  useFormContext2 as useFormContext,
  useFormField,
  useToast
};
//# sourceMappingURL=index.mjs.map