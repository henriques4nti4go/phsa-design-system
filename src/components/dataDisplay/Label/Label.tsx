import {
  Label as LabelComponent,
  LabelProps as LabelComponentProps,
} from "../../ui/label";

export type LabelProps = LabelComponentProps;

export const Label = (props: LabelProps) => {
  return <LabelComponent {...props} />;
};
