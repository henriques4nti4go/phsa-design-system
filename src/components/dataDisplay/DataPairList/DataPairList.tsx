import React from "react";
import { isEmpty } from "lodash";
import { DataPairListProps } from "./types";
import { cn } from "../../../lib/utils";

export const DataPairList = ({
  title,
  data,
  labels,
  className,
}: DataPairListProps) => {
  if (isEmpty(data)) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 border border-gray-200 rounded-md p-4",
        className
      )}
    >
      {title && <h2 className="font-semibold text-lg">{title}</h2>}
      <div className="flex flex-col gap-2 mt-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-row gap-2 items-center">
            <span className="text-sm text-gray-500 font-medium capitalize">
              {labels?.[key] || key}:
            </span>
            <span className="text-base">{value || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
