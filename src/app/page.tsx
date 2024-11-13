"use client";
import { useState } from "react";
import { Button } from "@/components";
import { CustomDrawer } from "@/components/layout/Drawer/CustomDrawer";

export default function Home() {
  const [open, setOpen] = useState(true);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CustomDrawer
        open={open}
        direction="left"
        className="max-w-sm"
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
