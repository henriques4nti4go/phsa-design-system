import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef, SortingState, VisibilityState } from '@tanstack/react-table';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import React__default, { PropsWithChildren } from 'react';
import { VariantProps } from 'class-variance-authority';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { NumericFormatProps } from 'react-number-format';
import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
export { useFormContext } from 'react-hook-form';
import * as _radix_ui_react_slot from '@radix-ui/react-slot';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as vaul from 'vaul';
import { Drawer as Drawer$1 } from 'vaul';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ToastPrimitives from '@radix-ui/react-toast';

interface DynamicTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    className?: string;
    toolbar?: React.ReactNode;
    pagination?: boolean;
    sorting?: boolean;
    columnVisibility?: boolean;
    filters?: React.ReactNode;
    rowsPerPage?: number[];
    defaultSort?: SortingState;
    defaultVisibility?: VisibilityState;
}

declare function DynamicTable<TData>({ data, columns, className, toolbar, pagination: showPagination, sorting: showSorting, columnVisibility: showColumnVisibility, filters, rowsPerPage, defaultSort, defaultVisibility, }: DynamicTableProps<TData>): react_jsx_runtime.JSX.Element;

interface Column<T> {
    header: string;
    accessorKey: keyof T;
    cell?: (row: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
}
interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    className?: string;
    filters?: React.ReactNode;
    onSort?: (field: keyof T, direction: "asc" | "desc") => void;
}

declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "success" | "warning" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

type IconProps = {
    name: string;
    size?: number;
    className?: string;
    color?: string;
};

declare const Icon: React__default.FC<IconProps>;

declare const Avatar: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React$1.RefAttributes<HTMLImageElement>, "ref"> & React$1.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;

declare const DropdownMenu: React$1.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React$1.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React$1.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

interface DataPairListProps {
    title?: string;
    data: Record<string, string | number | undefined>;
    labels?: Record<string, string>;
    className?: string;
    infoDirection?: "vertical" | "horizontal";
    direction?: "vertical" | "horizontal";
    withBorder?: boolean;
    header?: React.ReactNode;
}

declare const DataPairList: ({ title, data, labels, className, infoDirection, direction, withBorder, header, }: DataPairListProps) => react_jsx_runtime.JSX.Element | null;

declare const textVariants: (props?: ({
    variant?: "title" | "caption" | "display" | "subtitle" | "normal" | "muted" | null | undefined;
    align?: "left" | "center" | "right" | "justify" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TextProps = VariantProps<typeof textVariants> & {
    className?: string;
    children: React.ReactNode;
};
declare function Text({ variant, align, className, children, }: TextProps): react_jsx_runtime.JSX.Element;

type CheckboxProps$1 = React$1.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

type CheckboxProps = CheckboxProps$1 & {
    label: string;
    error?: string;
    withoutForm?: boolean;
};
declare const Checkbox: ({ label, error, withoutForm, ...props }: CheckboxProps) => react_jsx_runtime.JSX.Element;

type InputProps$1 = React$1.ComponentProps<"input">;

type InputBaseProps = InputProps$1 & {
    onChangeText?: (text: string) => void;
    mask?: string | string[];
    "data-testid"?: string;
};

type InputProps = Omit<InputBaseProps, "children"> & {
    component?: React.ReactNode;
    error?: string;
    withoutForm?: boolean;
    label?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    helperText?: string;
    floatingLabel?: boolean;
    "data-testid"?: string;
    extraElement?: React.ReactNode;
    containerClassName?: string;
};

declare const Input: ({ "data-testid": dataTestId, withoutForm, extraElement, containerClassName, ...props }: InputProps) => react_jsx_runtime.JSX.Element;

type NumberInputProps = Omit<NumericFormatProps, "onChange"> & InputProps;
declare const NumberInput: (props: NumberInputProps) => react_jsx_runtime.JSX.Element;

type MaskInputProps = {
    mask?: string;
} & InputProps;
declare const MaskInput: ({ "data-testid": dataTestId, withoutForm, extraElement, mask, ...props }: MaskInputProps) => react_jsx_runtime.JSX.Element;

type MultipleInputProps = MaskInputProps & {
    data?: string[];
    onAdd?: (data: string) => void;
    onRemove?: (position: number) => void;
    name: string;
    defaultValue?: string;
    "data-testid"?: string;
};
declare const MultipleInput: ({ data, onAdd, defaultValue, onRemove, withoutForm, ...props }: MultipleInputProps) => react_jsx_runtime.JSX.Element;

type MultipleMaskInputProps = MaskInputProps & {
    data?: string[];
    onChangeData?: (data: string[]) => void;
    name: string;
};
declare const MultipleMaskInput: ({ data, ...props }: MultipleMaskInputProps) => react_jsx_runtime.JSX.Element;

declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React$1.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => react_jsx_runtime.JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: react_hook_form.FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare const FormItem: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const FormLabel: React$1.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React$1.RefAttributes<HTMLLabelElement>, "ref"> & React$1.RefAttributes<HTMLLabelElement>>;
declare const FormControl: React$1.ForwardRefExoticComponent<Omit<_radix_ui_react_slot.SlotProps & React$1.RefAttributes<HTMLElement>, "ref"> & React$1.RefAttributes<HTMLElement>>;
declare const FormDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;

type SelectProps$1 = SelectPrimitive.SelectProps;

type SelectBaseProps = Omit<SelectProps$1, "onValueChange"> & {
    options: {
        value: string | number;
        label: string;
    }[];
    placeholder?: string;
    className?: string;
    id?: string;
    onChange?: (value: string) => void;
    value?: string;
    onChangeCallback?: (value: string) => void;
};

type SelectProps = SelectBaseProps & {
    label?: string;
    name?: string;
    error?: string;
    description?: string;
    withoutForm?: boolean;
};
declare const Select: ({ name, label, description, error, className, withoutForm, options, placeholder, ...props }: SelectProps) => react_jsx_runtime.JSX.Element;

type MultiSelectBaseProps = {
    options: {
        label: string;
        value: string;
    }[];
    selected?: string[];
    onChange?: (values: string[]) => void;
    placeholder?: string;
    className?: string;
};

type MultiSelectProps = MultiSelectBaseProps & {
    label?: string;
    name?: string;
    withoutForm?: boolean;
    className?: string;
    required?: boolean;
    "data-testid"?: string;
};
declare function MultiSelect({ label, name, withoutForm, className, required, "data-testid": testId, ...props }: MultiSelectProps): react_jsx_runtime.JSX.Element;

type SwitchProps$1 = React$1.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

type SwitchProps = SwitchProps$1 & {
    label?: string;
    withoutForm?: boolean;
};
declare function Switch({ label, withoutForm, className, ...props }: SwitchProps): react_jsx_runtime.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps$1 extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

type ButtonProps = ButtonProps$1 & {
    loading?: boolean;
};
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps$1 & {
    loading?: boolean;
} & React$1.RefAttributes<HTMLButtonElement>>;

type DialogProps$1 = DialogPrimitive.DialogProps;

type DialogProps = DialogProps$1 & PropsWithChildren & {
    className?: string;
    title?: string;
    description?: string;
    footer?: () => React.ReactNode;
};
declare function Dialog({ title, description, className, children, footer, ...props }: DialogProps): react_jsx_runtime.JSX.Element;
type DialogWithFormProps = DialogProps & {
    onSubmit: () => void;
};
declare const DialogWithForm: ({ title, description, className, children, footer, onSubmit, ...props }: DialogWithFormProps) => react_jsx_runtime.JSX.Element;

declare const Collapsible: React$1.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & React$1.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: React$1.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: React$1.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleContentProps & React$1.RefAttributes<HTMLDivElement>>;

type StepsProps = {
    data: {
        label?: string;
        id: number;
    }[];
    onClick?: (id: number) => void;
    value?: number;
};
declare const Steps: ({ data, onClick, value }: StepsProps) => react_jsx_runtime.JSX.Element;

type AlertDialogProps = {
    title: string;
    description?: string;
    children: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
};
declare const AlertDialog: ({ title, description, children, onConfirm, onCancel, }: AlertDialogProps) => react_jsx_runtime.JSX.Element;

type DrawerProps = React$1.ComponentProps<typeof Drawer$1.Root>;
declare const Drawer: {
    ({ shouldScaleBackground, ...props }: DrawerProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: typeof vaul.Portal;
declare const DrawerClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DrawerOverlay: React$1.ForwardRefExoticComponent<Omit<Omit<DialogPrimitive.DialogOverlayProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DrawerContent: React$1.ForwardRefExoticComponent<Omit<Omit<DialogPrimitive.DialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerTitle: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;

type CustomDrawerProps = DrawerProps & {
    className?: string;
};
declare function CustomDrawer({ className, ...props }: CustomDrawerProps): react_jsx_runtime.JSX.Element;

declare const Sheet$1: React$1.FC<DialogPrimitive.DialogProps>;

type SheetProps = typeof Sheet$1 & PropsWithChildren & {
    side?: "left" | "right" | "top" | "bottom";
    className?: string;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
};
declare function Sheet({ side, className, children, ...props }: SheetProps): react_jsx_runtime.JSX.Element;

type AppSidebarProps = {
    footer?: () => React$1.ReactNode;
    user?: {
        email?: string;
        name?: string;
    };
    enterprise?: {
        name: string;
        logo: () => React$1.ReactNode;
        plan: string;
    };
    navbar: {
        title: string;
        url: string;
        items: {
            title: string;
            url: string;
            isActive?: boolean | undefined;
            icon?: () => React$1.ReactNode;
        }[];
    }[];
};

interface SidebarProps extends AppSidebarProps {
    children: React.ReactNode;
    contentClassName?: string;
    showFooter?: boolean;
    defaultPath?: string;
    defaultCollapsed?: boolean;
}
declare const Sidebar: ({ children, contentClassName, showFooter, defaultPath, defaultCollapsed, ...rest }: SidebarProps) => react_jsx_runtime.JSX.Element;

declare function NavUser({ user, logoutAction, }: {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
    logoutAction?: () => void;
}): react_jsx_runtime.JSX.Element;

declare const Separator: React$1.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

type PageLayoutProps = PropsWithChildren & {
    title: string;
    subtitle?: string;
    header?: React__default.ReactNode;
};
declare const PageLayout: ({ subtitle, title, children, header, }: PageLayoutProps) => react_jsx_runtime.JSX.Element;

interface TabsProps {
    tabs: {
        label: string;
        content: React$1.ReactNode;
    }[];
    activeTabIndex?: number;
    onTabChange?: (index: number) => void;
    className?: string;
}
declare const Tabs: React$1.FC<TabsProps>;

declare const Breadcrumb: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
    separator?: React$1.ReactNode;
} & React$1.RefAttributes<HTMLElement>>;
declare const BreadcrumbList: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "ref"> & React$1.RefAttributes<HTMLOListElement>>;
declare const BreadcrumbItem: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React$1.RefAttributes<HTMLLIElement>>;
declare const BreadcrumbLink: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & {
    asChild?: boolean;
} & React$1.RefAttributes<HTMLAnchorElement>>;
declare const BreadcrumbPage: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const BreadcrumbEllipsis: {
    ({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const spinnerVariants: (props?: ({
    show?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const loaderVariants: (props?: ({
    size?: "small" | "medium" | "large" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SpinnerContentProps extends VariantProps<typeof spinnerVariants>, VariantProps<typeof loaderVariants> {
    className?: string;
    children?: React__default.ReactNode;
}
declare function Spinner({ size, show, children, className, }: SpinnerContentProps): react_jsx_runtime.JSX.Element;

declare function Toaster(): react_jsx_runtime.JSX.Element;

declare const Toast$1: React$1.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & React$1.RefAttributes<HTMLLIElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | "success" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React$1.RefAttributes<HTMLLIElement>>;
declare const ToastAction: React$1.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
type ToastProps = React$1.ComponentPropsWithoutRef<typeof Toast$1>;
type ToastActionElement = React$1.ReactElement<typeof ToastAction>;

type ToasterToast = ToastProps & {
    id: string;
    title?: React$1.ReactNode;
    description?: React$1.ReactNode;
    action?: ToastActionElement;
};
declare const actionTypes: {
    readonly ADD_TOAST: "ADD_TOAST";
    readonly UPDATE_TOAST: "UPDATE_TOAST";
    readonly DISMISS_TOAST: "DISMISS_TOAST";
    readonly REMOVE_TOAST: "REMOVE_TOAST";
};
type ActionType = typeof actionTypes;
type Action = {
    type: ActionType["ADD_TOAST"];
    toast: ToasterToast;
} | {
    type: ActionType["UPDATE_TOAST"];
    toast: Partial<ToasterToast>;
} | {
    type: ActionType["DISMISS_TOAST"];
    toastId?: ToasterToast["id"];
} | {
    type: ActionType["REMOVE_TOAST"];
    toastId?: ToasterToast["id"];
};
interface State {
    toasts: ToasterToast[];
}
declare const reducer: (state: State, action: Action) => State;
type Toast = Omit<ToasterToast, "id">;
declare function toast({ ...props }: Toast): {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
};
declare function useToast(): {
    toast: typeof toast;
    dismiss: (toastId?: string) => void;
    toasts: ToasterToast[];
};

export { AlertDialog, type AlertDialogProps, Avatar, AvatarFallback, AvatarImage, Badge, type BadgeProps, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, type ButtonProps, Checkbox, type CheckboxProps, Collapsible, CollapsibleContent, CollapsibleTrigger, type Column, CustomDrawer, type CustomDrawerProps, DataPairList, type DataPairListProps, Dialog, type DialogProps, DialogWithForm, type DialogWithFormProps, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, type DrawerProps, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, DynamicTable, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Icon, Input, MaskInput, type MaskInputProps, MultiSelect, MultipleInput, type MultipleInputProps, MultipleMaskInput, type MultipleMaskInputProps, NavUser, NumberInput, type NumberInputProps, PageLayout, type PageLayoutProps, Select, type SelectProps, Separator, Sheet, type SheetProps, Sidebar, Spinner, Steps, Switch, type SwitchProps, type TableProps, Tabs, Text, Toaster, badgeVariants, reducer, toast, useFormField, useToast };
