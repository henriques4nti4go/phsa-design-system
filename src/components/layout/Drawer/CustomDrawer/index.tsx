"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "../../../actions";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerProps,
  DrawerTitle,
  DrawerTrigger,
} from "../../Drawer";

export type CustomDrawerProps = DrawerProps & {
  className?: string;
};

export function CustomDrawer({ className, ...props }: CustomDrawerProps) {
  return (
    <Drawer {...props}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger> */}
      <DrawerContent className={className}>{props.children}</DrawerContent>
    </Drawer>
  );
}
