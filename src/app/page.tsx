"use client";
import { Card } from "../components/dataDisplay";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card
        title="Card title"
        description="Card description"
        footer={() => <div>Card footer</div>}
      />
    </div>
  );
}
