import type { Meta, StoryObj } from "@storybook/nextjs";
import { PageLayout } from "./index";
import { Icon, Text } from "../../../components/dataDisplay";
import { Button } from "../../../components/actions";

const meta: Meta<typeof PageLayout> = {
  title: "Layout/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    header: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {
    title: "Page Title",
    subtitle: "Page Subtitle",
    children: <Text>Page content goes here.</Text>,
  },
};

export const WithHeader: Story = {
  args: {
    title: "Page Title",
    subtitle: "Page Subtitle",
    header: (
      <Button>
        <Icon name="MdAdd" />
      </Button>
    ),
    children: <Text>Page content goes here.</Text>,
  },
};
