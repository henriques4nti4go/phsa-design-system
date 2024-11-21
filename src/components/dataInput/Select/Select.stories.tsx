import type { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectFormProps,
  SelectForm as SelectFormComponent,
} from "./Select";
import { useForm } from "react-hook-form";
import { Form } from "../form";
import { Button } from "../../../components/actions";

const meta = {
  title: "DataInput/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select placeholder",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
      { value: 3, label: "Option 3" },
    ],
    label: "Select label",
  },
};

export const SelectForm: StoryObj<SelectFormProps> = {
  render: () => {
    const form = useForm({
      defaultValues: {
        option: "",
      },
    });
    function onSubmit(data: any) {
      console.log(data);
    }
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <SelectFormComponent
            name="option"
            label="Opções"
            placeholder="Selecione uma opção"
            options={[
              { value: 1, label: "Option 1" },
              { value: 2, label: "Option 2" },
              { value: 3, label: "Option 3" },
            ]}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};
