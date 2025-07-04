import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from "../../actions/Button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  CustomDrawer as CustomDrawerComponent,
  CustomDrawerProps,
} from "./index";

const meta = {
  title: "DataDisplay/Drawer",
  render: (args) => {
    return (
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Drawer",
  },
};

export const CustomDrawer: StoryObj<CustomDrawerProps> = {
  args: {
    children: "Drawer",
    open: true,
  },
  argTypes: {
    direction: {
      options: ["top", "right", "bottom", "left"],
      control: {
        type: "select",
      },
    },
    className: {
      control: {
        type: "text",
      },
    },
    open: {
      control: {
        type: "boolean",
      },
    },
  },
  render: (args) => {
    return <CustomDrawerComponent {...args} />;
  },
};
