import type { Meta, StoryObj } from "@storybook/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CrudLayout } from "./index";
import { useForm } from "react-hook-form";
import { Input } from "@/components/dataInput/Input/components/Input";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useCrudLayoutActions } from "./store/CrudLayoutStore";

// Tipos de exemplo para as stories
interface ExampleData {
  _id: string;
  name: string;
  email: string;
  status: string;
}

interface CreateData {
  name: string;
  email: string;
  status: string;
}

interface UpdateData extends CreateData {
  _id: string;
}

// Dados de exemplo
const mockData: ExampleData[] = [
  {
    _id: "1",
    name: "João Silva",
    email: "joao@example.com",
    status: "Ativo",
  },
  {
    _id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    status: "Inativo",
  },
  {
    _id: "3",
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    status: "Ativo",
  },
];

// Componente de formulário de exemplo
const ExampleForm = () => {
  return (
    <div className="space-y-4">
      <Input name="name" label="Nome" placeholder="Digite o nome" required />
      <Input name="email" label="Email" placeholder="Digite o email" required />
      <Input
        name="status"
        label="Status"
        placeholder="Digite o status"
        required
      />
    </div>
  );
};

// Create a QueryClient instance for Storybook
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries in Storybook
      refetchOnWindowFocus: false, // Disable refetch on window focus
    },
  },
});

// Componente wrapper para usar o store
const CrudWrapper = (args: any) => {
  const form = useForm<CreateData | UpdateData>();
  const { setDeleteId, setEditId, setOpenEditModal } = useCrudLayoutActions();

  // Colunas da tabela
  const columns: ColumnDef<ExampleData>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditId(data._id);
                setOpenEditModal(true);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteId(data._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  // Funções de exemplo
  const createRequest = async (data: CreateData) => {
    console.log("Creating:", data);
    // Simula delay de requisição
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve();
  };

  const updateRequest = async (data: UpdateData) => {
    console.log("Updating:", data);
    // Simula delay de requisição
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve();
  };

  const deleteRequest = async (id: string) => {
    console.log("Deleting:", id);
    // Simula delay de requisição
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve();
  };

  const listRequest = async () => {
    // Simula delay de carregamento
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Promise.resolve(mockData);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CrudLayout
        {...args}
        columns={columns}
        form={form}
        formComponent={<ExampleForm />}
        createRequest={createRequest}
        updateRequest={updateRequest}
        deleteRequest={deleteRequest}
        listRequest={listRequest}
      />
    </QueryClientProvider>
  );
};

const meta: Meta<typeof CrudLayout> = {
  title: "Layout/Crud",
  component: CrudLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="p-4">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CrudLayout>;

export const Default: Story = {
  render: (args) => <CrudWrapper {...args} />,
  args: {
    title: "Gerenciar Usuários",
  },
};

export const EmptyState: Story = {
  render: (args) => {
    const form = useForm<CreateData | UpdateData>();
    const { setDeleteId, setEditId, setOpenEditModal } = useCrudLayoutActions();

    const columns: ColumnDef<ExampleData>[] = [
      {
        accessorKey: "name",
        header: "Nome",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditId(data._id);
                  setOpenEditModal(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteId(data._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <QueryClientProvider client={queryClient}>
        <CrudLayout
          {...args}
          columns={columns}
          form={form}
          formComponent={<ExampleForm />}
          createRequest={async () => Promise.resolve()}
          updateRequest={async () => Promise.resolve()}
          deleteRequest={async () => Promise.resolve()}
          listRequest={async () => Promise.resolve([])}
        />
      </QueryClientProvider>
    );
  },
  args: {
    title: "Lista Vazia",
  },
};

export const LoadingState: Story = {
  render: (args) => {
    const form = useForm<CreateData | UpdateData>();
    const { setDeleteId, setEditId, setOpenEditModal } = useCrudLayoutActions();

    const columns: ColumnDef<ExampleData>[] = [
      {
        accessorKey: "name",
        header: "Nome",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditId(data._id);
                  setOpenEditModal(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteId(data._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <QueryClientProvider client={queryClient}>
        <CrudLayout
          {...args}
          columns={columns}
          form={form}
          formComponent={<ExampleForm />}
          createRequest={async () => {
            // Simula carregamento infinito
            await new Promise((resolve) => setTimeout(resolve, 10000));
            return Promise.resolve();
          }}
          updateRequest={async () => {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            return Promise.resolve();
          }}
          deleteRequest={async () => {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            return Promise.resolve();
          }}
          listRequest={async () => {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            return Promise.resolve(mockData);
          }}
        />
      </QueryClientProvider>
    );
  },
  args: {
    title: "Estado de Carregamento",
  },
};
