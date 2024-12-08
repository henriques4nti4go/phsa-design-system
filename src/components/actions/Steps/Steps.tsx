import { useCallback } from "react";
import { Button } from "../Button";
import { Icon } from "../../../components/dataDisplay";
import { Separator } from "../../../components/layout";
import { cn } from "../../../lib/utils";

type StepsProps = {
  data: {
    label?: string;
    id: number;
  }[];
  onClick?: (id: number) => void;
  value?: number;
};
export const Steps = ({ data, onClick = () => {}, value }: StepsProps) => {
  const renderSteps = useCallback(() => {
    return data.map(({ label, id }, index) => {
      const isLast = index === data.length - 1;
      const isActive = typeof value === "number" && id <= value;

      return (
        <div key={index} className={cn(!isLast && "w-full flex items-center")}>
          <div>
            <Button
              onClick={() => onClick && onClick(id)}
              variant={isActive ? "default" : "outline"}
              size="icon"
              className="rounded-full"
            >
              {isActive ? <Icon name="MdCheck" /> : index + 1}
            </Button>
          </div>
          {label && <p className="absolute">{label}</p>}
          {!isLast && (
            <Separator
              orientation="horizontal"
              className={cn(isActive && "bg-primary h-[2px]")}
            />
          )}
          {/* {
              <Separator
                orientation="horizontal"
                className={cn("bg-primary h-[2px]")}
              />
            } */}
        </div>
      );
    });
  }, [data, onClick, value]);
  return <div className="flex w-full">{renderSteps()}</div>;
};
