import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import {
  Input,
  InputFormProps,
  InputForm as InputFormComponent,
} from "./Input";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/ui/form";
import { Button } from "../../../components/actions";

const meta = {
  title: "DataInput/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Input",
    placeholder: "Input placeholder",
  },
};

export const InputForm: StoryObj<InputFormProps> = {
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
          <InputFormComponent
            control={form.control}
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};
