import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import {
  Checkbox,
  CheckboxFormProps,
  CheckboxForm as CheckboxFormComponent,
} from "./Checkbox";
import { useForm } from "react-hook-form";
import { Form } from "../form";

const meta = {
  title: "DataInput/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Checkbox",
    id: "teste",
  },
};

export const CheckboxForm: StoryObj<CheckboxFormProps> = {
  render: () => {
    const form = useForm({
      defaultValues: {
        username: "",
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
          <CheckboxFormComponent name="checkbox" id="checkbox">
            checkbox
          </CheckboxFormComponent>
        </form>
      </Form>
    );
  },
};
