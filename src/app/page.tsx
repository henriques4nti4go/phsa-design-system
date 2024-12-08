"use client";
import { dataTable } from "../components/dataDisplay/Table/table.stories";
import {
  CustomTable,
  DataTablePagination,
  DataTableToolbar,
  Icon,
} from "../components/dataDisplay";
import { columns } from "./columns";
import {
  Button,
  DialogWithForm,
  Form,
  Input,
  InputForm,
  InputMaskForm,
  SelectForm,
  Separator,
  Steps,
} from "@/components";
import { useForm } from "react-hook-form";
import { Tabs } from "@/components/dataDisplay/Tabs/Tabs";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Home() {
  const form = useForm();
  const tabData = useMemo(() => {
    return [
      {
        label: "Account",
        value: "account",
        content: (
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        ),
      },
    ];
  }, []);
  return (
    <div className="flex w-full justify-center flex-col items-center">
      <h1>asdas</h1>
      <Form {...form}>
        <InputMaskForm
          name="cardNumber"
          label="Card number"
          mask={["aaa-0000", "aaa-0a00"]}
          prepare={(value) => value.toUpperCase()}
        />
      </Form>
      {/* <CustomTable
        columns={columns}
        data={dataTable}
        renderPagination={(table) => <DataTablePagination table={table} />}
        renderToolbar={(table) => <DataTableToolbar table={table} />}
      /> */}
    </div>
  );
}
