import { AlertCircle, Edit, Plus, Trash2 } from "lucide-react";
import { Table } from "./components/Table";
import { CrudLayoutProps } from "./types";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useTitleModal,
  useDescriptionModal,
  useSubmitButtonText,
  useCreateButtonText,
  useCrudLayoutActions,
  useOpenEditModal,
  useDeleteId,
  useEditId,
  useSendingButtonText,
} from "./store/CrudLayoutStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRequest } from "./hook/useRequest";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export const CrudLayout = <
  ListData extends { _id: string },
  CreateData,
  UpdateData
>({
  columns,
  title,
  createRequest,
  updateRequest,
  deleteRequest,
  listRequest = () => Promise.resolve({ data: [], total: 0 }),
  formComponent,
  actions = [],
  form,
}: CrudLayoutProps<ListData, CreateData, UpdateData>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const titleModal = useTitleModal();
  const descriptionModal = useDescriptionModal();
  const submitButtonText = useSubmitButtonText();
  const createButtonText = useCreateButtonText();
  const sendingButtonText = useSendingButtonText();
  const deleteId = useDeleteId();
  const editId = useEditId();
  const openEditModal = useOpenEditModal();
  const { setDeleteId, setOpenEditModal, setEditId } = useCrudLayoutActions();

  const isEditMode = useMemo(() => modalMode === "edit", [modalMode]);

  const {
    listData,
    total,
    error,
    createActionRequest,
    updateActionRequest,
    deleteActionRequest,
    isLoading,
  } = useRequest({
    queryKey: "configs",
    createRequest,
    updateRequest,
    deleteRequest,
    listRequest,
    page,
    limit,
  });

  useEffect(() => {
    if (openEditModal && editId) {
      const itemToEdit = listData.find((item: ListData) => item._id === editId);
      if (itemToEdit) {
        form.reset(itemToEdit);
        setModalMode("edit");
        setIsModalOpen(true);
        setOpenEditModal(false);
      }
    }
  }, [editId, form, listData, openEditModal, setOpenEditModal]);

  const resetForm = useCallback(() => {
    form.reset({});
    const formValues = form.getValues();
    Object.keys(formValues).forEach((key) => {
      form.setValue(key, "");
    });
  }, [form]);

  const customColumns = useMemo(() => {
    const editButton = actions.includes("update") && {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex gap-2">
            {actions.includes("update") && (
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
            )}
            {actions.includes("delete") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteId(data._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        );
      },
    };

    const data = [...columns];

    if (editButton) data.push(editButton);

    return data;
  }, [columns, actions, setEditId, setOpenEditModal, setDeleteId]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalMode("create");
    setEditId(null);
    resetForm();
  }, [setEditId, resetForm]);

  const onSubmit = useCallback(
    async (data: CreateData | UpdateData) => {
      try {
        let success;

        if (isEditMode) {
          success = await updateActionRequest(data as UpdateData);
          if (success) {
            toast.success("Configuração atualizada");
          }
        } else {
          success = await createActionRequest(data as CreateData);
          if (success) {
            toast.success("Configuração criada");
          }
        }

        if (success) {
          closeModal();
        }
      } catch (error) {
        console.error("Erro ao salvar:", error);
        toast.error("Erro ao salvar configuração");
      }
    },
    [createActionRequest, updateActionRequest, isEditMode, closeModal]
  );

  const onClickCreate = useCallback(() => {
    resetForm();
    setModalMode("create");
    setEditId(null);
    setIsModalOpen(true);
  }, [setEditId, resetForm]);

  const onDeleteData = useCallback(
    async (dataId: string) => {
      const success = await deleteActionRequest(dataId);
      if (success) {
        toast.success("Configuração deletada com sucesso");
        setDeleteId(null);
      }
    },
    [deleteActionRequest, setDeleteId]
  );

  const handleModalOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        closeModal();
      }
    },
    [closeModal]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6 bg-white rounded-md">
      <div className="flex justify-between items-center md:flex-row flex-col gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={onClickCreate} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> {createButtonText}
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{titleModal}</DialogTitle>
            <DialogDescription>{descriptionModal}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {formComponent}
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? sendingButtonText : submitButtonText}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Table<ListData>
        data={listData}
        columns={customColumns}
        isLoading={isLoading}
        pagination={{
          page,
          limit,
          total,
          onPageChange: handlePageChange,
          onLimitChange: handleLimitChange,
        }}
      />
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{titleModal}</AlertDialogTitle>
            <AlertDialogDescription>{descriptionModal}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDeleteData(deleteId as string)}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? sendingButtonText : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
