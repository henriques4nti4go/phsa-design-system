import React from "react";
import { isEmpty } from "lodash";
import { DataPairListProps } from "./types";
import { cn } from "../../../lib/utils";
import { Text } from "../Text";

export const DataPairList = ({
  title,
  data,
  labels,
  className,
  infoDirection = "horizontal",
  direction = "vertical",
  withBorder = false,
  header = <></>,
}: DataPairListProps) => {
  if (isEmpty(data)) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-md p-4",
        withBorder && "border border-muted",
        className
      )}
    >
      <div className="flex gap-3">
        {title && <Text variant="title">{title}</Text>}
        {header}
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-5 mt-5",
          direction === "vertical" ? "" : "sm:grid-cols-2 md:grid-cols-4"
        )}
      >
        {Object.entries(data || {}).map(([key, value], index) => (
          <div
            className={cn(
              "flex gap-3",
              infoDirection === "horizontal" ? "flex-row" : "flex-col"
            )}
            key={index}
          >
            <Text className="uppercase text-muted-foreground font-bold">
              {labels?.[key] || key}:
            </Text>
            <Text>{value}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
