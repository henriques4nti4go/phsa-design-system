import React, { useCallback, useMemo } from "react";
import { IconContext } from "react-icons";
import { IconProps } from "./types";

export const Icon: React.FC<IconProps> = ({ name, size = 24, ...rest }) => {
  const nameIcon = useMemo(() => name, [name]);

  const iconsModulePath = useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      md: require("react-icons/md"),
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      fa: require("react-icons/fa"),
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      bs: require("react-icons/bs"),
    }),
    []
  );

  const typeIcon = useMemo(() => {
    const matches = [...nameIcon.matchAll(/[A-Z]/g)];
    return String(
      nameIcon.slice(0, matches[1]?.index) || ""
    ).toLocaleLowerCase();
  }, [nameIcon]);

  const Icon = useCallback(
    (props: typeof rest) => {
      try {
        if (!typeIcon || !nameIcon) return <></>;

        return iconsModulePath[typeIcon as keyof typeof iconsModulePath][
          nameIcon
        ]?.(props);
      } catch {
        return <></>;
      }
    },
    [iconsModulePath, nameIcon, typeIcon]
  );

  return (
    <IconContext.Provider value={{ size: String(size) }}>
      <Icon {...rest} />
    </IconContext.Provider>
  );
};
