import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../..//lib/utils";

// Definição das variantes com pesos adequados
const textVariants = cva("", {
  variants: {
    variant: {
      display: "text-5xl font-extrabold tracking-tight",
      title: "text-3xl font-bold tracking-tight",
      subtitle: "text-2xl font-semibold",
      normal: "text-base font-normal",
      caption: "text-sm font-medium",
      muted: "text-sm font-normal text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    variant: "normal",
    align: "left",
  },
});

// Mapeia variantes para as tags HTML corretas
const tagMap = {
  display: "h1",
  title: "h2",
  subtitle: "h3",
  normal: "p",
  caption: "small",
  muted: "p",
} as const;

type TextProps = VariantProps<typeof textVariants> & {
  className?: string;
  children: React.ReactNode;
};

export function Text({
  variant = "normal",
  align,
  className,
  children,
}: TextProps) {
  const Tag = tagMap[variant || "normal"] || "p";

  return (
    <Tag className={cn(textVariants({ variant, align }), className)}>
      {children}
    </Tag>
  );
}
