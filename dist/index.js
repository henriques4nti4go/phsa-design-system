"use client"
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AlertDialog: () => AlertDialog2,
  Avatar: () => Avatar,
  AvatarFallback: () => AvatarFallback,
  AvatarImage: () => AvatarImage,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  BreadcrumbEllipsis: () => BreadcrumbEllipsis,
  BreadcrumbItem: () => BreadcrumbItem,
  BreadcrumbLink: () => BreadcrumbLink,
  BreadcrumbList: () => BreadcrumbList,
  BreadcrumbPage: () => BreadcrumbPage,
  BreadcrumbSeparator: () => BreadcrumbSeparator,
  Button: () => Button2,
  Checkbox: () => Checkbox2,
  Collapsible: () => Collapsible,
  CollapsibleContent: () => CollapsibleContent2,
  CollapsibleTrigger: () => CollapsibleTrigger2,
  CustomDrawer: () => CustomDrawer,
  DataPairList: () => DataPairList,
  Dialog: () => Dialog2,
  DialogWithForm: () => DialogWithForm,
  Drawer: () => Drawer,
  DrawerClose: () => DrawerClose,
  DrawerContent: () => DrawerContent,
  DrawerDescription: () => DrawerDescription,
  DrawerFooter: () => DrawerFooter,
  DrawerHeader: () => DrawerHeader,
  DrawerOverlay: () => DrawerOverlay,
  DrawerPortal: () => DrawerPortal,
  DrawerTitle: () => DrawerTitle,
  DrawerTrigger: () => DrawerTrigger,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuPortal: () => DropdownMenuPortal,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuShortcut: () => DropdownMenuShortcut,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  DynamicTable: () => DynamicTable,
  Form: () => Form,
  FormControl: () => FormControl,
  FormDescription: () => FormDescription,
  FormField: () => FormField,
  FormItem: () => FormItem,
  FormLabel: () => FormLabel,
  FormMessage: () => FormMessage,
  Icon: () => Icon2,
  Input: () => Input2,
  MaskInput: () => MaskInput,
  MultiSelect: () => MultiSelect,
  MultipleInput: () => MultipleInput,
  MultipleMaskInput: () => MultipleMaskInput,
  NavUser: () => NavUser,
  NumberInput: () => NumberInput,
  PageLayout: () => PageLayout,
  Select: () => Select2,
  Separator: () => Separator3,
  Sheet: () => Sheet2,
  Sidebar: () => Sidebar2,
  Spinner: () => Spinner,
  Steps: () => Steps,
  Switch: () => Switch2,
  Tabs: () => Tabs2,
  Text: () => Text,
  Toaster: () => Toaster,
  badgeVariants: () => badgeVariants,
  reducer: () => reducer,
  toast: () => toast,
  useFormContext: () => import_react_hook_form2.useFormContext,
  useFormField: () => useFormField,
  useToast: () => useToast
});
module.exports = __toCommonJS(index_exports);

// src/components/dataDisplay/Table/components/DynamicTable/index.tsx
var React5 = __toESM(require("react"));
var import_react_table = require("@tanstack/react-table");

// src/components/ui/table.tsx
var React = __toESM(require("react"));

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/ui/table.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Table = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", __spreadValues({ ref, className: cn("[&_tr]:border-b", className) }, props));
});
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "caption",
    __spreadValues({
      ref,
      className: cn("mt-4 text-sm text-muted-foreground", className)
    }, props)
  );
});
TableCaption.displayName = "TableCaption";

// src/components/dataDisplay/Table/components/DynamicTable/data-table-view-options.tsx
var import_react_dropdown_menu = require("@radix-ui/react-dropdown-menu");
var import_react_icons = require("@radix-ui/react-icons");

// src/components/ui/button.tsx
var React2 = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");
var import_jsx_runtime2 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
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
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var React3 = __toESM(require("react"));
var DropdownMenuPrimitive = __toESM(require("@radix-ui/react-dropdown-menu"));
var import_lucide_react = require("lucide-react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, inset, children } = _b, props = __objRest(_b, ["className", "inset", "children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.ChevronRight, { className: "ml-auto" })
      ]
    })
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Check, { className: "h-4 w-4" }) }) }),
        children
      ]
    })
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    DropdownMenuPrimitive.RadioItem,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Circle, { className: "h-2 w-2 fill-current" }) }) }),
        children
      ]
    })
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React3.forwardRef((_a, ref) => {
  var _b = _a, { className, inset } = _b, props = __objRest(_b, ["className", "inset"]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "span",
    __spreadValues({
      className: cn("ml-auto text-xs tracking-widest opacity-60", className)
    }, props)
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// src/components/dataDisplay/Table/components/DynamicTable/data-table-view-options.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function DataTableViewOptions({
  table
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(DropdownMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_dropdown_menu.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "ml-auto hidden h-8 lg:flex",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_icons.MixerHorizontalIcon, { className: "mr-2 h-4 w-4" }),
          "Colunas"
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(DropdownMenuContent, { align: "end", className: "w-[150px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DropdownMenuLabel, { children: "Colunas vis\xEDveis" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DropdownMenuSeparator, {}),
      table.getAllColumns().filter(
        (column) => typeof column.accessorFn !== "undefined" && column.getCanHide()
      ).map((column) => {
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_jsx_runtime5 = require("react/jsx-runtime");
function DataTableToolbar({
  table,
  filters,
  showColumnVisibility
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex flex-1 items-center space-x-2", children: filters }),
    showColumnVisibility && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DataTableViewOptions, { table })
  ] });
}

// src/components/dataDisplay/Table/components/DynamicTable/data-table-pagination.tsx
var import_react_icons2 = require("@radix-ui/react-icons");

// src/components/ui/select.tsx
var React4 = __toESM(require("react"));
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React4.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.ChevronDown, { className: "h-4 w-4 opacity-50" }) })
      ]
    })
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    SelectPrimitive.ScrollUpButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.ChevronUp, { className: "h-4 w-4" })
    })
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    SelectPrimitive.ScrollDownButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.ChevronDown, { className: "h-4 w-4" })
    })
  );
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React4.forwardRef((_a, ref) => {
  var _b = _a, { className, children, position = "popper" } = _b, props = __objRest(_b, ["className", "children", "position"]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SelectScrollUpButton, {}),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SelectScrollDownButton, {})
      ]
    })
  ) });
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    SelectPrimitive.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.Check, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SelectPrimitive.ItemText, { children })
      ]
    })
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    SelectPrimitive.Separator,
    __spreadValues({
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className)
    }, props)
  );
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/dataDisplay/Table/components/DynamicTable/data-table-pagination.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function DataTablePagination({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50]
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center justify-between px-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex-1 text-sm text-muted-foreground", children: [
      table.getFilteredSelectedRowModel().rows.length,
      " de",
      " ",
      table.getFilteredRowModel().rows.length,
      " linha(s) selecionada(s)."
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-sm font-medium", children: "Linhas por p\xE1gina" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
          Select,
          {
            value: `${table.getState().pagination.pageSize}`,
            onValueChange: (value) => {
              table.setPageSize(Number(value));
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectTrigger, { className: "h-8 w-[70px]", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectValue, { placeholder: table.getState().pagination.pageSize }) }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectContent, { side: "top", children: pageSizeOptions.map((pageSize) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectItem, { value: `${pageSize}`, children: pageSize }, pageSize)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
        "P\xE1gina ",
        table.getState().pagination.pageIndex + 1,
        " de",
        " ",
        table.getPageCount()
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          Button,
          {
            variant: "outline",
            className: "hidden h-8 w-8 p-0 lg:flex",
            onClick: () => table.setPageIndex(0),
            disabled: !table.getCanPreviousPage(),
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_icons2.DoubleArrowLeftIcon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          Button,
          {
            variant: "outline",
            className: "h-8 w-8 p-0",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_icons2.ChevronLeftIcon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          Button,
          {
            variant: "outline",
            className: "h-8 w-8 p-0",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_icons2.ChevronRightIcon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          Button,
          {
            variant: "outline",
            className: "hidden h-8 w-8 p-0 lg:flex",
            onClick: () => table.setPageIndex(table.getPageCount() - 1),
            disabled: !table.getCanNextPage(),
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_icons2.DoubleArrowRightIcon, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}

// src/components/dataDisplay/Table/components/DynamicTable/data-table-column-header.tsx
var import_react_icons3 = require("@radix-ui/react-icons");
var import_jsx_runtime8 = require("react/jsx-runtime");
function DataTableColumnHeader({
  column,
  title,
  className
}) {
  if (!column.getCanSort()) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cn(className), children: title });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cn("flex items-center space-x-2", className), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(DropdownMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "-ml-3 h-8 data-[state=open]:bg-accent",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: title }),
          column.getIsSorted() === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_icons3.ArrowDownIcon, { className: "ml-2 h-4 w-4" }) : column.getIsSorted() === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_icons3.ArrowUpIcon, { className: "ml-2 h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_icons3.CaretSortIcon, { className: "ml-2 h-4 w-4" })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(DropdownMenuContent, { align: "start", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(DropdownMenuItem, { onClick: () => column.toggleSorting(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_icons3.ArrowUpIcon, { className: "mr-2 h-3.5 w-3.5 text-muted-foreground/70" }),
        "Crescente"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(DropdownMenuItem, { onClick: () => column.toggleSorting(true), children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_icons3.ArrowDownIcon, { className: "mr-2 h-3.5 w-3.5 text-muted-foreground/70" }),
        "Decrescente"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(DropdownMenuSeparator, {}),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(DropdownMenuItem, { onClick: () => column.toggleVisibility(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_icons3.EyeNoneIcon, { className: "mr-2 h-3.5 w-3.5 text-muted-foreground/70" }),
        "Ocultar"
      ] })
    ] })
  ] }) });
}

// src/components/dataDisplay/Table/components/DynamicTable/index.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
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
  const table = (0, import_react_table.useReactTable)({
    data,
    columns,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)(),
    onSortingChange: setSorting,
    getSortedRowModel: showSorting ? (0, import_react_table.getSortedRowModel)() : void 0,
    getPaginationRowModel: (0, import_react_table.getPaginationRowModel)(),
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "space-y-4", children: [
    (toolbar || filters || showColumnVisibility) && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      DataTableToolbar,
      {
        table,
        filters,
        showColumnVisibility
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: cn("rounded-md border", className), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TableHead, { children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        DataTableColumnHeader,
        {
          column: header.column,
          title: header.column.columnDef.header
        }
      ) }, header.id)) }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TableCell, { children: (0, import_react_table.flexRender)(
        cell.column.columnDef.cell,
        cell.getContext()
      ) }, cell.id)) }, row.id)) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "Nenhum resultado encontrado."
        }
      ) }) })
    ] }) }),
    showPagination && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(DataTablePagination, { table, pageSizeOptions: rowsPerPage })
  ] });
}

// src/components/ui/badge.tsx
var import_class_variance_authority2 = require("class-variance-authority");
var import_jsx_runtime10 = require("react/jsx-runtime");
var badgeVariants = (0, import_class_variance_authority2.cva)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", __spreadValues({ className: cn(badgeVariants({ variant }), className) }, props));
}

// src/components/dataDisplay/Icon/Icon.tsx
var import_react = require("react");
var import_react_icons4 = require("react-icons");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Icon2 = (_a) => {
  var _b = _a, { name, size = 24 } = _b, rest = __objRest(_b, ["name", "size"]);
  const nameIcon = (0, import_react.useMemo)(() => name, [name]);
  const iconsModulePath = (0, import_react.useMemo)(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      md: require("react-icons/md"),
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      fa: require("react-icons/fa"),
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      bs: require("react-icons/bs")
    }),
    []
  );
  const typeIcon = (0, import_react.useMemo)(() => {
    var _a2;
    const matches = [...nameIcon.matchAll(/[A-Z]/g)];
    return String(
      nameIcon.slice(0, (_a2 = matches[1]) == null ? void 0 : _a2.index) || ""
    ).toLocaleLowerCase();
  }, [nameIcon]);
  const Icon3 = (0, import_react.useCallback)(
    (props) => {
      var _a2, _b2;
      try {
        if (!typeIcon || !nameIcon) return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_jsx_runtime11.Fragment, {});
        return (_b2 = (_a2 = iconsModulePath[typeIcon])[nameIcon]) == null ? void 0 : _b2.call(_a2, props);
      } catch (e) {
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_jsx_runtime11.Fragment, {});
      }
    },
    [iconsModulePath, nameIcon, typeIcon]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react_icons4.IconContext.Provider, { value: { size: String(size) }, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon3, __spreadValues({}, rest)) });
};

// src/components/ui/avatar.tsx
var React7 = __toESM(require("react"));
var AvatarPrimitive = __toESM(require("@radix-ui/react-avatar"));
var import_jsx_runtime12 = require("react/jsx-runtime");
var Avatar = React7.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
var import_lodash = require("lodash");

// src/components/dataDisplay/Text/Text.tsx
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime13 = require("react/jsx-runtime");
var textVariants = (0, import_class_variance_authority3.cva)("", {
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
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Tag, { className: cn(textVariants({ variant, align }), className), children });
}

// src/components/dataDisplay/DataPairList/DataPairList.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var DataPairList = ({
  title,
  data,
  labels,
  className,
  infoDirection = "horizontal",
  direction = "vertical",
  withBorder = false,
  header = /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, {})
}) => {
  if ((0, import_lodash.isEmpty)(data)) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-col gap-2 rounded-md p-4",
        withBorder && "border border-muted",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex gap-3", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Text, { variant: "title", children: title }),
          header
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "div",
          {
            className: cn(
              "grid grid-cols-1  mt-5",
              direction === "vertical" ? "gap-3" : "sm:grid-cols-2 md:grid-cols-4 gap-10"
            ),
            children: Object.entries(data || {}).map(([key, value], index) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "div",
              {
                className: cn(
                  "flex gap-3",
                  infoDirection === "horizontal" ? "flex-row" : "flex-col"
                ),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(Text, { className: "uppercase text-muted-foreground font-bold", children: [
                    (labels == null ? void 0 : labels[key]) || key,
                    ":"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Text, { children: value })
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
var import_react_hook_form3 = require("react-hook-form");

// src/components/ui/checkbox.tsx
var React8 = __toESM(require("react"));
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"));
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
var Checkbox = React8.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    CheckboxPrimitive.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        CheckboxPrimitive.Indicator,
        {
          className: cn("flex items-center justify-center text-current"),
          children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react3.Check, { className: "h-4 w-4" })
        }
      )
    })
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/ui/label.tsx
var React9 = __toESM(require("react"));
var LabelPrimitive = __toESM(require("@radix-ui/react-label"));
var import_class_variance_authority4 = require("class-variance-authority");
var import_jsx_runtime16 = require("react/jsx-runtime");
var labelVariants = (0, import_class_variance_authority4.cva)(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label3 = React9.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    LabelPrimitive.Root,
    __spreadValues({
      ref,
      className: cn(labelVariants(), className)
    }, props)
  );
});
Label3.displayName = LabelPrimitive.Root.displayName;

// src/components/dataInput/form/index.ts
var import_react_hook_form2 = require("react-hook-form");

// src/components/ui/form.tsx
var React10 = __toESM(require("react"));
var import_react_slot2 = require("@radix-ui/react-slot");
var import_react_hook_form = require("react-hook-form");
var import_jsx_runtime17 = require("react/jsx-runtime");
var Form = import_react_hook_form.FormProvider;
var FormFieldContext = React10.createContext(
  {}
);
var FormField = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react_hook_form.Controller, __spreadValues({}, props)) });
};
var useFormField = () => {
  const fieldContext = React10.useContext(FormFieldContext);
  const itemContext = React10.useContext(FormItemContext);
  const { getFieldState, formState } = (0, import_react_hook_form.useFormContext)();
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", __spreadValues({ ref, className: cn("space-y-2", className) }, props)) });
});
FormItem.displayName = "FormItem";
var FormLabel = React10.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    import_react_slot2.Slot,
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
var import_jsx_runtime18 = require("react/jsx-runtime");
var ErrorMessage = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("p", { className: "text-sm font-medium text-destructive", children });
};

// src/components/dataInput/checkbox/Checkbox.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
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
  const form = (0, import_react_hook_form3.useFormContext)();
  const hasForm = !withoutForm && !!form && !!props.name;
  if (!hasForm)
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Checkbox, __spreadValues({}, props)),
      label && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Label3, { htmlFor: props.id, children: label }),
      error && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ErrorMessage, { children: error })
    ] });
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    FormField,
    {
      control: form.control,
      name: (_a2 = props.name) != null ? _a2 : "",
      render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          Checkbox,
          {
            checked: field.value,
            onCheckedChange: field.onChange
          }
        ) }),
        label && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "space-y-1 leading-none", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(FormLabel, { children: label }) })
      ] })
    }
  );
};

// src/components/ui/input.tsx
var React11 = __toESM(require("react"));
var import_jsx_runtime20 = require("react/jsx-runtime");
var Input = React11.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type } = _b, props = __objRest(_b, ["className", "type"]);
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
var import_react3 = require("react");

// src/components/feedback/ErrorLabel/index.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var ErrorLabel = ({
  children,
  className,
  "data-testid": dataTestId
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    "div",
    {
      className: cn("flex items-center gap-2 my-2", className),
      "data-testid": `${dataTestId}-error-label`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Icon2, { name: "MdErrorOutline", size: 18, className: "text-destructive" }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "text-destructive text-sm", children })
      ]
    }
  );
};

// src/components/dataInput/Input/components/InputBase/index.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var InputBase = ({
  label,
  error,
  children,
  required,
  "data-testid": testId
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Label3, { "data-testid": `${testId}-label`, children: [
      `${label} ${required ? "*" : ""}`,
      " "
    ] }),
    children,
    error && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(ErrorLabel, { "data-testid": testId, children: error })
  ] });
};

// src/hooks/use-conditional-controller.tsx
var import_react2 = require("react");
var import_react_hook_form4 = require("react-hook-form");
var useConditionalController = ({
  name,
  withoutForm
}) => {
  const form = (0, import_react_hook_form4.useFormContext)();
  const hasForm = (0, import_react2.useMemo)(() => {
    return !withoutForm && !!(form == null ? void 0 : form.control);
  }, [withoutForm, form]);
  const tempForm = (0, import_react_hook_form4.useForm)();
  const controlToUse = (0, import_react2.useMemo)(() => {
    return hasForm ? form.control : tempForm.control;
  }, [tempForm, form, hasForm]);
  const controller = (0, import_react_hook_form4.useController)({
    control: controlToUse,
    name: name || "temp"
  });
  return hasForm ? controller.field : {};
};

// src/components/dataInput/Input/components/Input/index.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
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
  const inputProps = (0, import_react3.useMemo)(() => {
    return __spreadValues(__spreadValues({}, formData), props);
  }, [formData, props]);
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    InputBase,
    {
      label: props.label,
      error: props.error,
      required: props.required,
      "data-testid": dataTestId,
      children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: cn("flex items-center gap-2", containerClassName), children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
var import_react_number_format = require("react-number-format");
var import_react4 = require("react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var NumberInput = (props) => {
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm: props.withoutForm
  });
  const inputProps = (0, import_react4.useMemo)(() => {
    return __spreadValues(__spreadValues({}, formData), props);
  }, [formData, props]);
  const onValueChange = (0, import_react4.useCallback)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(InputBase, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    import_react_number_format.NumericFormat,
    __spreadProps(__spreadValues({}, inputProps), {
      customInput: Input,
      value: props.value,
      onValueChange
    })
  ) }));
};

// src/components/dataInput/Input/components/MaskInput/mask-input.tsx
var React12 = __toESM(require("react"));

// src/hooks/use-mask.tsx
var import_react5 = require("react");
var useMask = (_a) => {
  var _b = _a, { mask } = _b, options = __objRest(_b, ["mask"]);
  const [value, setValue] = (0, import_react5.useState)("");
  const applyMask = (0, import_react5.useCallback)(
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
  const handleSetValue = (0, import_react5.useCallback)(
    (newValue) => {
      const maskedValue = applyMask(newValue);
      setValue(maskedValue);
    },
    [applyMask]
  );
  const getRawValue = (0, import_react5.useCallback)(() => {
    return value.replace(/[^a-zA-Z0-9]/g, "");
  }, [value]);
  const isComplete = (0, import_react5.useCallback)(() => {
    return value.length === mask.length;
  }, [value, mask]);
  const isValid = (0, import_react5.useCallback)(() => {
    return isComplete() && value.length > 0;
  }, [isComplete, value]);
  const clear = (0, import_react5.useCallback)(() => {
    setValue("");
  }, []);
  const getFormProps = (0, import_react5.useCallback)(
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
var import_react6 = require("react");
var import_jsx_runtime25 = require("react/jsx-runtime");
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
  const inputRef = (0, import_react6.useRef)(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
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
var import_react7 = require("react");

// src/components/ui/spinner.tsx
var import_class_variance_authority5 = require("class-variance-authority");
var import_jsx_runtime26 = require("react/jsx-runtime");
var spinnerVariants = (0, import_class_variance_authority5.cva)("flex-col items-center justify-center", {
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
var loaderVariants = (0, import_class_variance_authority5.cva)("animate-spin text-primary", {
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
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("span", { className: spinnerVariants({ show }), children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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
var React13 = __toESM(require("react"));
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
var React14 = __toESM(require("react"));
var ToastPrimitives = __toESM(require("@radix-ui/react-toast"));
var import_class_variance_authority6 = require("class-variance-authority");
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime27 = require("react/jsx-runtime");
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var toastVariants = (0, import_class_variance_authority6.cva)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    ToastPrimitives.Close,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        className
      ),
      "toast-close": ""
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react4.X, { className: "h-4 w-4" })
    })
  );
});
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    ToastPrimitives.Description,
    __spreadValues({
      ref,
      className: cn("text-sm opacity-90", className)
    }, props)
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// src/components/ui/toaster.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(ToastProvider, { children: [
    toasts.map(function(_a) {
      var _b = _a, { id, title, description, action } = _b, props = __objRest(_b, ["id", "title", "description", "action"]);
      return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(Toast, __spreadProps(__spreadValues({}, props), { children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ToastTitle, { children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ToastClose, {})
      ] }), id);
    }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ToastViewport, {})
  ] });
}

// src/components/actions/Button/Button.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var Button2 = (0, import_react7.forwardRef)(
  (_a, ref) => {
    var _b = _a, { children, disabled, loading } = _b, rest = __objRest(_b, ["children", "disabled", "loading"]);
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(Button, __spreadProps(__spreadValues({}, rest), { disabled: disabled || loading, ref, children: [
      loading && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Spinner, { className: "fill-white" }),
      children
    ] }));
  }
);
Button2.displayName = "Button";

// src/components/dataInput/Input/components/MultipleInput/MultipleInput.tsx
var import_react8 = require("react");
var import_jsx_runtime30 = require("react/jsx-runtime");
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
  const [inputValue, setInputValue] = (0, import_react8.useState)(defaultValue);
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm
  });
  const inputItems = (0, import_react8.useMemo)(() => {
    if (formData == null ? void 0 : formData.value) {
      return formData.value;
    }
    return data;
  }, [data, formData]);
  const onAddData = (0, import_react8.useCallback)(() => {
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
  const onRemoveData = (0, import_react8.useCallback)(
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
  const renderItens = (0, import_react8.useCallback)(() => {
    return inputItems == null ? void 0 : inputItems.map((item, index) => {
      return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "flex justify-between", children: [
        item,
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          Button2,
          {
            variant: "ghost",
            className: "text-destructive",
            size: "icon",
            onClick: () => onRemoveData(index),
            children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Icon2, { name: "MdDelete" })
          }
        )
      ] }, item);
    });
  }, [inputItems, onRemoveData]);
  const extraElement = (0, import_react8.useMemo)(
    () => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Button2, { type: "button", onClick: onAddData, disabled: !inputValue, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Icon2, { name: "MdAdd" }) }),
    [onAddData, inputValue]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
var React15 = __toESM(require("react"));
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime31 = require("react/jsx-runtime");
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React15.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(DialogPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(DialogOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react5.X, { className: "h-4 w-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: "sr-only", children: "Close" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    DialogPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/actions/Dialog/Dialog.tsx
var import_react9 = require("react");
var import_jsx_runtime32 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Dialog, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(DialogContent, { className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(DialogHeader, { children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DialogTitle, { children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DialogDescription, { children: description })
    ] }),
    children,
    footer && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DialogFooter, { children: footer() })
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
  const dialogRef = (0, import_react9.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Dialog, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DialogContent, { className, ref: dialogRef, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("form", { onSubmit, className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(DialogHeader, { children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DialogTitle, { children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DialogDescription, { children: description })
    ] }),
    children,
    footer && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex justify-between w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DialogClose, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Button2, { type: "button", variant: "secondary", children: "Fechar" }) }),
      footer()
    ] }) })
  ] }) }) }));
};

// src/components/ui/collapsible.tsx
var CollapsiblePrimitive = __toESM(require("@radix-ui/react-collapsible"));
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger;
var CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;

// src/components/actions/Steps/Steps.tsx
var import_react12 = require("react");

// src/components/ui/drawer.tsx
var React16 = __toESM(require("react"));
var import_vaul = require("vaul");
var import_jsx_runtime33 = require("react/jsx-runtime");
var Drawer = (_a) => {
  var _b = _a, { shouldScaleBackground = true } = _b, props = __objRest(_b, ["shouldScaleBackground"]);
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    import_vaul.Drawer.Root,
    __spreadValues({
      shouldScaleBackground
    }, props)
  );
};
Drawer.displayName = "Drawer";
var DrawerTrigger = import_vaul.Drawer.Trigger;
var DrawerPortal = import_vaul.Drawer.Portal;
var DrawerClose = import_vaul.Drawer.Close;
var DrawerOverlay = React16.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    import_vaul.Drawer.Overlay,
    __spreadValues({
      ref,
      className: cn("fixed inset-0 z-50 bg-black/80", className)
    }, props)
  );
});
DrawerOverlay.displayName = import_vaul.Drawer.Overlay.displayName;
var DrawerContent = React16.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(DrawerPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(DrawerOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
      import_vaul.Drawer.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
          className
        )
      }, props), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }),
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    "div",
    __spreadValues({
      className: cn("mt-auto flex flex-col gap-2 p-4", className)
    }, props)
  );
};
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = React16.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    import_vaul.Drawer.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )
    }, props)
  );
});
DrawerTitle.displayName = import_vaul.Drawer.Title.displayName;
var DrawerDescription = React16.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    import_vaul.Drawer.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
DrawerDescription.displayName = import_vaul.Drawer.Description.displayName;

// src/components/layout/Drawer/CustomDrawer/index.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
function CustomDrawer(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Drawer, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DrawerContent, { className, children: props.children }) }));
}

// src/components/ui/sheet.tsx
var React17 = __toESM(require("react"));
var SheetPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_class_variance_authority7 = require("class-variance-authority");
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime35 = require("react/jsx-runtime");
var Sheet = SheetPrimitive.Root;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React17.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
var sheetVariants = (0, import_class_variance_authority7.cva)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(SheetPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(SheetOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
      SheetPrimitive.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(sheetVariants({ side }), className)
      }, props), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_lucide_react6.X, { className: "h-4 w-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", { className: "sr-only", children: "Close" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    SheetPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// src/components/layout/Sheet/Sheet.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
function Sheet2(_a) {
  var _b = _a, { side, className, children } = _b, props = __objRest(_b, ["side", "className", "children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Sheet, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(SheetContent, { side, className, children }) }));
}

// src/components/ui/sidebar.tsx
var React21 = __toESM(require("react"));
var import_react_slot3 = require("@radix-ui/react-slot");
var import_class_variance_authority8 = require("class-variance-authority");
var import_lucide_react7 = require("lucide-react");

// src/hooks/use-mobile.tsx
var React18 = __toESM(require("react"));
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
var React19 = __toESM(require("react"));
var SeparatorPrimitive = __toESM(require("@radix-ui/react-separator"));
var import_jsx_runtime37 = require("react/jsx-runtime");
var Separator3 = React19.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, orientation = "horizontal", decorative = true } = _b, props = __objRest(_b, ["className", "orientation", "decorative"]);
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
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
var import_jsx_runtime38 = require("react/jsx-runtime");
function Skeleton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    "div",
    __spreadValues({
      className: cn("animate-pulse rounded-md bg-primary/10", className)
    }, props)
  );
}

// src/components/ui/tooltip.tsx
var React20 = __toESM(require("react"));
var TooltipPrimitive = __toESM(require("@radix-ui/react-tooltip"));
var import_jsx_runtime39 = require("react/jsx-runtime");
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React20.forwardRef((_a, ref) => {
  var _b = _a, { className, sideOffset = 4 } = _b, props = __objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(TooltipPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
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
var import_jsx_runtime40 = require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(Sheet, __spreadProps(__spreadValues({ open: openMobile, onOpenChange: setOpenMobile }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: "flex h-full w-full flex-col", children })
        }
      ) }));
    }
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
      "div",
      {
        ref,
        className: "group peer hidden md:block text-sidebar-foreground",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
              children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react7.PanelLeft, {}),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    })
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = React21.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  const Comp = asChild ? import_react_slot3.Slot : "div";
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  const Comp = asChild ? import_react_slot3.Slot : "button";
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
    "li",
    __spreadValues({
      ref,
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className)
    }, props)
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = (0, import_class_variance_authority8.cva)(
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
    const Comp = asChild ? import_react_slot3.Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(Tooltip, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  const Comp = asChild ? import_react_slot3.Slot : "button";
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
    "div",
    __spreadProps(__spreadValues({
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("rounded-md h-8 flex gap-2 px-2 items-center", className)
    }, props), {
      children: [
        showIcon && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("li", __spreadValues({ ref }, props));
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = React21.forwardRef((_a, ref) => {
  var _b = _a, { asChild = false, size = "md", isActive, className } = _b, props = __objRest(_b, ["asChild", "size", "isActive", "className"]);
  const Comp = asChild ? import_react_slot3.Slot : "a";
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
var import_lucide_react9 = require("lucide-react");

// src/components/layout/Sidebar/components/team-switcher.tsx
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime41 = require("react/jsx-runtime");
function TeamSwitcher({
  teams
}) {
  const { isMobile } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(DropdownMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
    SidebarMenuButton,
    {
      size: "lg",
      className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("div", { className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground" }),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: "truncate font-semibold", children: teams == null ? void 0 : teams.name }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: "truncate text-xs", children: teams == null ? void 0 : teams.plan })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_lucide_react8.ChevronsUpDown, { className: "ml-auto" })
      ]
    }
  ) }) }) }) });
}

// src/components/layout/Sidebar/components/menus.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
function Menus({
  items
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_jsx_runtime42.Fragment, { children: items.map((item, index) => {
    var _a;
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(SidebarGroup, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SidebarGroupLabel, { children: item.title }),
      /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SidebarMenu, { children: (_a = item.items) == null ? void 0 : _a.map((subItem) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
        SidebarMenuButton,
        {
          asChild: true,
          className: cn(
            (subItem == null ? void 0 : subItem.isActive) && "bg-sidebar-accent font-semibold"
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("a", { href: subItem.url, children: [
            (subItem == null ? void 0 : subItem.icon) && subItem.icon(),
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { children: subItem.title })
          ] })
        }
      ) }, subItem.title)) })
    ] }, index);
  }) });
}

// src/components/layout/Sidebar/components/app-sidebar.tsx
var import_jsx_runtime43 = require("react/jsx-runtime");
function AppSidebar(_a) {
  var _b = _a, {
    navbar = [],
    enterprise = {
      name: "Acme Inc",
      logo: () => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_lucide_react9.GalleryVerticalEnd, {}),
      plan: "Enterprise"
    },
    footer
  } = _b, props = __objRest(_b, [
    "navbar",
    "enterprise",
    "footer"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(Sidebar, __spreadProps(__spreadValues({ collapsible: "icon" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(SidebarHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(TeamSwitcher, { teams: enterprise }) }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(SidebarContent, { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Menus, { items: navbar }) }),
    footer && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(SidebarFooter, { children: footer() }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(SidebarRail, {})
  ] }));
}

// src/components/ui/breadcrumb.tsx
var React22 = __toESM(require("react"));
var import_react_slot4 = require("@radix-ui/react-slot");
var import_lucide_react10 = require("lucide-react");
var import_jsx_runtime44 = require("react/jsx-runtime");
var Breadcrumb = React22.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("nav", __spreadValues({ ref, "aria-label": "breadcrumb" }, props));
});
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React22.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
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
  const Comp = asChild ? import_react_slot4.Slot : "a";
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
    "li",
    __spreadProps(__spreadValues({
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)
    }, props), {
      children: children != null ? children : /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_lucide_react10.ChevronRight, {})
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
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
    "span",
    __spreadProps(__spreadValues({
      role: "presentation",
      "aria-hidden": "true",
      className: cn("flex h-9 w-9 items-center justify-center", className)
    }, props), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_lucide_react10.MoreHorizontal, { className: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "sr-only", children: "More" })
      ]
    })
  );
};
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

// src/components/layout/Sidebar/provider/index.tsx
var import_react10 = require("react");
var import_jsx_runtime45 = require("react/jsx-runtime");
var SidebarContext2 = (0, import_react10.createContext)({});
function SidebarProvider2({
  children,
  defaultPath = "/",
  defaultCollapsed = false
}) {
  const [isCollapsed, setIsCollapsed] = (0, import_react10.useState)(defaultCollapsed);
  const [currentPath, setCurrentPath] = (0, import_react10.useState)(defaultPath);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
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
  const context = (0, import_react10.useContext)(SidebarContext2);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// src/components/layout/Sidebar/components/header-sidebar.tsx
var import_jsx_runtime46 = require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(BreadcrumbItem, { children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(BreadcrumbPage, { className: "capitalize", children: label }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(BreadcrumbItem, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(BreadcrumbLink, { href: path, className: "capitalize", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(BreadcrumbSeparator, {})
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
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("header", { className: "flex h-16 shrink-0 items-center border-b border-border bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(SidebarTrigger, { className: "-ml-2 h-9 w-9" }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Separator3, { orientation: "vertical", className: "h-6" }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Breadcrumb, { children: /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(BreadcrumbList, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(BreadcrumbItem, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(BreadcrumbLink, { href: "/", className: "capitalize", children: "Home" }),
        /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(BreadcrumbSeparator, {})
      ] }),
      breadcrumbItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(BreadcrumbElement, __spreadValues({}, item), item.path))
    ] }) })
  ] }) });
};

// src/components/layout/Sidebar/components/footer-sidebar.tsx
var import_jsx_runtime47 = require("react/jsx-runtime");
var FooterSidebar = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("footer", { className: "h-[65px]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Separator3, {}),
    /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "flex items-center justify-between h-16 bg-background px-5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("span", { className: "text-sm text-muted-foreground", children: [
        "\xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Your Company"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { className: "text-sm text-muted-foreground", children: "Feito na terra do sol \u{1F31E}" })
    ] })
  ] });
};

// src/components/layout/Sidebar/Sidebar.tsx
var import_jsx_runtime48 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
    SidebarProvider2,
    {
      defaultPath,
      defaultCollapsed,
      children: /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(SidebarProvider, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(AppSidebar, __spreadValues({}, rest)),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(SidebarInset, { className: "overflow-auto bg-slate-50", children: [
          /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(HeaderSidebar, {}),
          /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
            "main",
            {
              className: cn(
                "flex flex-1 flex-col gap-4 p-4 pt-0",
                contentClassName
              ),
              children
            }
          ),
          showFooter && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(FooterSidebar, {})
        ] })
      ] })
    }
  );
};

// src/components/layout/Sidebar/components/nav-user.tsx
var import_lucide_react11 = require("lucide-react");
var import_react11 = require("react");
var import_jsx_runtime49 = require("react/jsx-runtime");
function NavUser({
  user,
  logoutAction = () => {
  }
}) {
  const { isMobile } = useSidebar();
  const renderUserInformation = (0, import_react11.useCallback)(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(import_jsx_runtime49.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(Avatar, { className: "h-8 w-8 rounded-lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(AvatarImage, { src: user == null ? void 0 : user.avatar, alt: user == null ? void 0 : user.name }),
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(AvatarFallback, { className: "rounded-lg", children: "CN" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "truncate font-semibold", children: user == null ? void 0 : user.name }),
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "truncate text-xs", children: user == null ? void 0 : user.email })
      ] })
    ] });
  }, [user]);
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(DropdownMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
      SidebarMenuButton,
      {
        size: "lg",
        className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
        children: [
          renderUserInformation(),
          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_lucide_react11.ChevronsUpDown, { className: "ml-auto size-4" })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
      DropdownMenuContent,
      {
        className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
        side: isMobile ? "bottom" : "right",
        align: "end",
        sideOffset: 4,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: renderUserInformation() }) }),
          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownMenuSeparator, {}),
          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(DropdownMenuItem, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_lucide_react11.Sparkles, {}),
            "Upgrade to Pro"
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownMenuSeparator, {}),
          /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(DropdownMenuGroup, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(DropdownMenuItem, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_lucide_react11.BadgeCheck, {}),
              "Account"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(DropdownMenuItem, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_lucide_react11.CreditCard, {}),
              "Billing"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(DropdownMenuItem, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_lucide_react11.Bell, {}),
              "Notifications"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownMenuSeparator, {}),
          /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(DropdownMenuItem, { onClick: logoutAction, children: [
            /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_lucide_react11.LogOut, {}),
            "Log out"
          ] })
        ]
      }
    )
  ] }) }) });
}

// src/components/layout/PageLayout/index.tsx
var import_jsx_runtime50 = require("react/jsx-runtime");
var PageLayout = ({
  subtitle,
  title,
  children,
  header
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "m-5 p-4 bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Text, { variant: "title", children: title }),
        subtitle && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Text, { variant: "muted", children: subtitle })
      ] }),
      header
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "mt-5", children })
  ] });
};

// src/components/ui/tabs.tsx
var React23 = __toESM(require("react"));
var TabsPrimitive = __toESM(require("@radix-ui/react-tabs"));
var import_jsx_runtime51 = require("react/jsx-runtime");
var Tabs = TabsPrimitive.Root;
var TabsList = React23.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
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
var import_jsx_runtime52 = require("react/jsx-runtime");
var Tabs2 = ({
  tabs,
  activeTabIndex = 0,
  onTabChange,
  className
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(
    Tabs,
    {
      value: tabs[activeTabIndex].label,
      onValueChange: (value) => {
        const index = tabs.findIndex((tab) => tab.label === value);
        if (onTabChange) onTabChange(index);
      },
      className: cn("w-full", className),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(TabsList, { children: tabs.map((tab, index) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(TabsTrigger, { value: tab.label, children: tab.label }, index)) }),
        tabs.map((tab, index) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(TabsContent, { value: tab.label, children: tab.content }, index))
      ]
    }
  );
};

// src/components/actions/Steps/Steps.tsx
var import_jsx_runtime53 = require("react/jsx-runtime");
var Steps = ({ data, onClick = () => {
}, value }) => {
  const renderSteps = (0, import_react12.useCallback)(() => {
    return data.map(({ label, id }, index) => {
      const isLast = index === data.length - 1;
      const isActive = typeof value === "number" && id <= value;
      return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("div", { className: cn(!isLast && "w-full flex items-center"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
          Button2,
          {
            onClick: () => onClick && onClick(id),
            variant: isActive ? "default" : "outline",
            size: "icon",
            className: "rounded-full",
            children: isActive ? /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(Icon2, { name: "MdCheck" }) : index + 1
          }
        ) }),
        label && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("p", { className: "absolute", children: label }),
        !isLast && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
          Separator3,
          {
            orientation: "horizontal",
            className: cn(isActive && "bg-primary h-[2px]")
          }
        )
      ] }, index);
    });
  }, [data, onClick, value]);
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", { className: "flex w-full", children: renderSteps() });
};

// src/components/ui/alert-dialog.tsx
var React24 = __toESM(require("react"));
var AlertDialogPrimitive = __toESM(require("@radix-ui/react-alert-dialog"));
var import_jsx_runtime54 = require("react/jsx-runtime");
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React24.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(AlertDialogPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(AlertDialogOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
var import_jsx_runtime55 = require("react/jsx-runtime");
var AlertDialog2 = ({
  title,
  description,
  children,
  onConfirm,
  onCancel
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(AlertDialog, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(AlertDialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(AlertDialogContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(AlertDialogHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(AlertDialogTitle, { children: title }),
        description && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(AlertDialogFooter, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(AlertDialogCancel, { onClick: onCancel, children: "Cancel" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(AlertDialogAction, { onClick: onConfirm, children: "Continue" })
      ] })
    ] })
  ] });
};

// src/components/dataInput/Input/components/MultipleInput/MultipleInputBase.tsx
var import_react13 = require("react");
var import_react_hook_form5 = require("react-hook-form");
var import_lodash2 = __toESM(require("lodash"));
var import_jsx_runtime56 = require("react/jsx-runtime");
var MultipleInputBase = ({
  children,
  data = [],
  name,
  onChangeData = () => {
  },
  error
}) => {
  const form = (0, import_react_hook_form5.useFormContext)();
  const withForm = !!form && !!name;
  const [inputValue, setInputValue] = (0, import_react13.useState)("");
  const inputData = (0, import_react13.useMemo)(() => {
    if (withForm) {
      return import_lodash2.default.get(form.watch(), name) || [];
    }
    return data;
  }, [withForm, form, name, data]);
  const errorMessage = (0, import_react13.useMemo)(() => {
    var _a;
    if (withForm) {
      return (_a = import_lodash2.default.get(form.formState.errors, name)) == null ? void 0 : _a.message;
    }
    return error;
  }, [error, form, name, withForm]);
  const updateData = (0, import_react13.useCallback)(() => {
    if (!inputValue.length) return;
    if (withForm) {
      form.setValue(name, [...inputData, inputValue]);
    } else {
      onChangeData == null ? void 0 : onChangeData(inputData.concat(inputValue));
    }
    setInputValue("");
  }, [inputData, inputValue, withForm, form, name, onChangeData]);
  const removeItem = (0, import_react13.useCallback)(
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
  const renderOptions = (0, import_react13.useCallback)(() => {
    return inputData == null ? void 0 : inputData.map((item, index) => {
      return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "flex justify-between mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { children: item }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          Button2,
          {
            onClick: () => removeItem(index),
            variant: "ghost",
            size: "icon",
            type: "button",
            children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Icon2, { name: "MdDelete", className: "fill-destructive" })
          }
        )
      ] }, index);
    });
  }, [inputData, removeItem]);
  return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { children: [
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
var import_jsx_runtime57 = require("react/jsx-runtime");
var MultipleMaskInput = (_a) => {
  var _b = _a, {
    data = []
  } = _b, props = __objRest(_b, [
    "data"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(MultipleInputBase, __spreadProps(__spreadValues({ data }, props), { children: ({ onChange, addItem, value }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
      MaskInput,
      __spreadProps(__spreadValues({}, props), {
        value,
        onChange,
        withoutForm: true,
        component: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(Button2, { type: "button", onClick: () => addItem(), children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(Icon2, { name: "MdAdd" }) })
      })
    );
  } }));
};

// src/components/dataInput/Select/SelectBase.tsx
var import_react14 = require("react");
var import_jsx_runtime58 = require("react/jsx-runtime");
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
  const onSelect = (0, import_react14.useCallback)(
    (value2) => {
      onChange(value2);
      onChangeCallback(value2);
    },
    [onChange, onChangeCallback]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(
    Select,
    __spreadProps(__spreadValues({}, rest), {
      onValueChange: onSelect,
      defaultValue: value,
      value,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectValue, { placeholder }) }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectContent, { children: options == null ? void 0 : options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectItem, { value: String(option.value), children: option.label }, index)) })
      ]
    })
  );
};

// src/components/dataInput/Select/Select.tsx
var import_react_hook_form6 = require("react-hook-form");
var import_jsx_runtime59 = require("react/jsx-runtime");
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
  const form = (0, import_react_hook_form6.useFormContext)();
  const hasForm = !!form && !!name;
  if (!hasForm || withoutForm) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: cn("space-y-2", className), children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Label3, { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(SelectBase, __spreadValues({ options, placeholder }, props)),
      description && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { className: "text-sm text-muted-foreground", children: description }),
      error && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(ErrorMessage, { children: error })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
    FormField,
    {
      control: form.control,
      name,
      render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(FormItem, { className, children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormLabel, { children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
          SelectBase,
          __spreadValues(__spreadValues({
            options,
            placeholder
          }, props), field)
        ) }),
        description && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormDescription, { children: description }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormMessage, {})
      ] })
    }
  );
};

// src/components/dataDisplay/Label/Label.tsx
var import_jsx_runtime60 = require("react/jsx-runtime");
var Label4 = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(Label3, __spreadValues({}, props));
};

// src/components/dataInput/Select/MultiSelect/MultiSelectBase.tsx
var React25 = __toESM(require("react"));
var import_lucide_react12 = require("lucide-react");
var Popover = __toESM(require("@radix-ui/react-popover"));
var import_jsx_runtime61 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(Popover.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Popover.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
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
            return /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
              "div",
              {
                className: "flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground",
                children: [
                  option.label,
                  /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        handleRemoveItem(value);
                      },
                      className: "rounded-full hover:bg-secondary-foreground/20",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_lucide_react12.X, { className: "h-3 w-3" }),
                        /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)("span", { className: "sr-only", children: [
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
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("div", { className: "flex-1", children: selected.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("span", { className: "text-muted-foreground", children: placeholder }) })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Popover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
      Popover.Content,
      {
        className: "w-[--radix-popover-trigger-width] z-50 mt-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        align: "start",
        sideOffset: 4,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)("div", { className: "flex items-center border-b border-border px-3 py-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_lucide_react12.Search, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("div", { className: "max-h-[200px] overflow-auto", children: filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("div", { className: "px-2 py-4 text-center text-sm text-muted-foreground", children: "No results found." }) : filteredOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
            "div",
            {
              onClick: () => handleSelectItem(option.value),
              className: cn(
                "flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-accent",
                selected.includes(option.value) && "bg-accent"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
                  "div",
                  {
                    className: cn(
                      "flex h-4 w-4 items-center justify-center rounded border border-primary",
                      selected.includes(option.value) && "bg-primary text-primary-foreground"
                    ),
                    children: selected.includes(option.value) && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("span", { className: "text-[10px]", children: "\u2713" })
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
var import_react_hook_form7 = require("react-hook-form");
var import_jsx_runtime62 = require("react/jsx-runtime");
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
  const form = (0, import_react_hook_form7.useFormContext)();
  const hasForm = !withoutForm && !!form && !!name;
  if (!hasForm)
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "grid w-full items-center gap-3", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label4, { htmlFor: name, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(MultiSelectBase, __spreadValues({}, props))
    ] });
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
    FormField,
    {
      control: form.control,
      name,
      render: (_a2) => {
        var { field: _b2 } = _a2, _c = _b2, { value } = _c, rest = __objRest(_c, ["value"]);
        return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
          FormItem,
          {
            className,
            "data-testid": testId ? `form-item-${testId}` : void 0,
            children: [
              label && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                FormLabel,
                {
                  htmlFor: name,
                  "data-testid": testId ? `form-label-${testId}` : void 0,
                  children: `${label}${required ? " *" : ""}`
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "flex w-full items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(MultiSelectBase, __spreadProps(__spreadValues(__spreadValues({}, props), rest), { selected: value })) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
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
var React26 = __toESM(require("react"));
var SwitchPrimitives = __toESM(require("@radix-ui/react-switch"));
var import_jsx_runtime63 = require("react/jsx-runtime");
var Switch = React26.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
    SwitchPrimitives.Root,
    __spreadProps(__spreadValues({
      className: cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )
    }, props), {
      ref,
      children: /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
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
var import_react_hook_form8 = require("react-hook-form");
var import_jsx_runtime64 = require("react/jsx-runtime");
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
  const form = (0, import_react_hook_form8.useFormContext)();
  const hasForm = !!form && !withoutForm && !!props.name;
  if (!hasForm)
    return /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Switch, __spreadValues({}, props)),
      label && /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Label3, { htmlFor: props.id, children: label })
    ] });
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
    FormField,
    {
      control: form.control,
      name: (_a2 = props.name) != null ? _a2 : "",
      render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(
        FormItem,
        {
          className: cn(className, "flex items-center space-x-2 space-y-0"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Switch2, { checked: field.value, onCheckedChange: field.onChange }) }),
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(FormLabel, { children: label })
          ]
        }
      )
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlertDialog,
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
  Button,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  CustomDrawer,
  DataPairList,
  Dialog,
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
  Icon,
  Input,
  MaskInput,
  MultiSelect,
  MultipleInput,
  MultipleMaskInput,
  NavUser,
  NumberInput,
  PageLayout,
  Select,
  Separator,
  Sheet,
  Sidebar,
  Spinner,
  Steps,
  Switch,
  Tabs,
  Text,
  Toaster,
  badgeVariants,
  reducer,
  toast,
  useFormContext,
  useFormField,
  useToast
});
//# sourceMappingURL=index.js.map