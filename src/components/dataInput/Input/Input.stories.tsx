import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import {
  Input,
  InputFormProps,
  InputForm as InputFormComponent,
  InputMaskForm,
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

export const PatternInput: StoryObj<InputFormProps> = {
  render: () => {
    const form = useForm({
      defaultValues: {
        cardNumber: "1231231",
      },
    });

    function onSubmit(data: any) {
      console.log(data);
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-6 w-[300px]"
        >
          <InputMaskForm
            name="cardNumber"
            label="Card number"
            placeholder="Enter your card number"
            mask="+4\9 99 999 99"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};
