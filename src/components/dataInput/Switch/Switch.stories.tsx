import type { Meta, StoryObj } from "@storybook/nextjs";
import { Switch } from "./index";
import { useState } from "react";
import { Form } from "../form";
import { useForm } from "react-hook-form";

const meta: Meta<typeof Switch> = {
  title: "Data Input/Switch",
  component: Switch,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Switch>;

const SwitchWithHooks = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      label="Notifications"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
};

export const Default: Story = {
  render: () => <SwitchWithHooks />,
};

export const WithoutLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <Switch
        label="Active status"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const WithForm: Story = {
  args: {
    name: "switch",
    label: "Terms and Conditions",
    required: true,
  },
  decorators: [
    (Story: React.ComponentType) => {
      const form = useForm({
        defaultValues: {
          switch: true,
        },
      });

      return (
        <Form {...form}>
          <Story />
        </Form>
      );
    },
  ],
};
