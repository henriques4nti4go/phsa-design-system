export interface DataPairListProps {
  title?: string;
  data: Record<string, string | number | undefined>;
  labels?: Record<string, string>;
  className?: string;
  infoDirection?: "vertical" | "horizontal";
  direction?: "vertical" | "horizontal";
  withBorder?: boolean;
  header?: React.ReactNode;
}
