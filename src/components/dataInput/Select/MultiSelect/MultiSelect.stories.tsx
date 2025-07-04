import type { Meta, StoryObj } from "@storybook/nextjs";
import { MultiSelect } from "./index";
import { useState } from "react";
import { Form } from "../../form";
import { useForm } from "react-hook-form";

const meta: Meta<typeof MultiSelect> = {
  title: "Data Input/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const options = [
  { label: "Next.js", value: "nextjs" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt.js", value: "nuxtjs" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
];

const MultiSelectWithHooks = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <MultiSelect
      label="MultiSelect"
      options={options}
      selected={selected}
      onChange={setSelected}
      placeholder="Select frameworks..."
    />
  );
};

export const Default: Story = {
  render: () => <MultiSelectWithHooks />,
};

export const Preselected: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["nextjs", "nuxtjs"]);

    return (
      <MultiSelect
        options={options}
        selected={selected}
        onChange={setSelected}
        placeholder="Select frameworks..."
      />
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <MultiSelect
        options={options}
        selected={selected}
        onChange={setSelected}
        placeholder="Choose your favorite frameworks..."
      />
    );
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const manyOptions = [
      ...options,
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Solid", value: "solid" },
      { label: "Qwik", value: "qwik" },
      { label: "Ember", value: "ember" },
      { label: "Preact", value: "preact" },
      { label: "Alpine", value: "alpine" },
    ];

    return (
      <MultiSelect
        options={manyOptions}
        selected={selected}
        onChange={setSelected}
        placeholder="Select frameworks..."
      />
    );
  },
};

export const WithForm: Story = {
  args: {
    name: "multiSelect",
    options: [{ label: "Next.js", value: "nextjs" }],
    label: "MultiSelect",
    required: true,
  },
  decorators: [
    (Story: React.ComponentType) => {
      const form = useForm({
        defaultValues: {
          multiSelect: ["nextjs"],
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
