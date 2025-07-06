import type { Meta, StoryObj } from "@storybook/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CrudLayout } from "./index";
import { useForm } from "react-hook-form";
import { Input } from "@/components/dataInput/Input/components/Input";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useCrudLayoutActions } from "./store/CrudLayoutStore";
import { useCrudLayout } from "./hook/useCrudLayout";

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

// Função para gerar dados aleatórios
const generateMockData = (count: number): ExampleData[] => {
  const firstNames = [
    "João",
    "Maria",
    "Pedro",
    "Ana",
    "Carlos",
    "Lucia",
    "Roberto",
    "Fernanda",
    "Ricardo",
    "Juliana",
    "Marcos",
    "Patricia",
    "Antonio",
    "Carla",
    "José",
    "Sandra",
    "Paulo",
    "Beatriz",
    "Francisco",
    "Mariana",
    "Luiz",
    "Gabriela",
    "Miguel",
    "Larissa",
    "Rafael",
    "Camila",
    "Daniel",
    "Renata",
    "Felipe",
    "Vanessa",
    "Bruno",
    "Priscila",
    "Thiago",
    "Amanda",
    "Leonardo",
    "Bianca",
    "Gustavo",
    "Natalia",
    "Rodrigo",
    "Tatiana",
    "Eduardo",
    "Viviane",
    "Vinicius",
    "Claudia",
    "Matheus",
    "Sabrina",
    "Lucas",
    "Adriana",
    "Diego",
    "Monica",
  ];

  const lastNames = [
    "Silva",
    "Santos",
    "Oliveira",
    "Costa",
    "Ferreira",
    "Pereira",
    "Lima",
    "Alves",
    "Souza",
    "Rodrigues",
    "Martins",
    "Carvalho",
    "Barbosa",
    "Gomes",
    "Nascimento",
    "Ribeiro",
    "Araujo",
    "Dias",
    "Fernandes",
    "Morais",
    "Cardoso",
    "Campos",
    "Rocha",
    "Monteiro",
    "Mendes",
    "Freitas",
    "Pinto",
    "Cavalcanti",
    "Vieira",
    "Teixeira",
    "Moreira",
    "Correia",
    "Castro",
    "Andrade",
    "Nunes",
    "Ramos",
    "Lopes",
    "Machado",
    "Reis",
    "Moura",
    "Cunha",
    "Pires",
    "Farias",
    "Melo",
    "Azevedo",
    "Borges",
    "Paiva",
    "Coelho",
    "Guimaraes",
    "Nogueira",
  ];

  const domains = [
    "example.com",
    "test.com",
    "demo.com",
    "sample.org",
    "mock.net",
  ];
  const statuses = ["Ativo", "Inativo", "Pendente", "Suspenso"];

  const data: ExampleData[] = [];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;

    data.push({
      _id: i.toString(),
      name: `${firstName} ${lastName}`,
      email: email,
      status: status,
    });
  }

  return data;
};

// Dados de exemplo gerados automaticamente
const mockData: ExampleData[] = generateMockData(100);

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
  useCrudLayout({
    create: {
      titleModal: "Criar Usuário",
      submitButtonText: "Criar",
      descriptionModal: "Crie um novo usuário",
    },
    update: {
      titleModal: "Atualizar Usuário",
      submitButtonText: "Atualizar",
      descriptionModal: "Atualize os dados do usuário",
    },
    delete: {
      titleModal: "Deletar Usuário",
      submitButtonText: "Deletar",
      descriptionModal: "Tem certeza que deseja deletar o usuário?",
    },
    createButtonText: "Novo usuário",
  });

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

  const listRequest = async (page?: number, limit?: number) => {
    // Simula delay de carregamento
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Implementar paginação nos dados mock
    const startIndex = ((page || 1) - 1) * (limit || 10);
    const endIndex = startIndex + (limit || 10);
    const paginatedData = mockData.slice(startIndex, endIndex);

    return Promise.resolve({
      data: paginatedData,
      total: mockData.length,
    });
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
        actions={["update", "delete"]}
        title="Gerenciar Usuários"
        description="Gerencie os usuários do sistema"
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
