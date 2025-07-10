import { useMemo } from "react";
import {
  useController,
  useForm,
  useFormContext,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

export const useConditionalController = ({
  name,
  withoutForm,
}: {
  name: string;
  withoutForm?: boolean;
}): ControllerRenderProps<FieldValues, string> | Record<string, never> => {
  const form = useFormContext();

  const hasForm = useMemo(() => {
    return !withoutForm && !!form?.control;
  }, [withoutForm, form]);

  const tempForm = useForm();

  const controlToUse = useMemo(() => {
    return hasForm ? form.control : tempForm.control;
  }, [tempForm, form, hasForm]);

  const controller = useController({
    control: controlToUse,
    name: name || "temp",
  });

  return hasForm ? controller.field : {};
};
