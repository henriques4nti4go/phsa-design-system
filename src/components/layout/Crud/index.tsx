import { AlertCircle, Plus } from "lucide-react";
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
  listRequest = () => Promise.resolve([]),
  formComponent,
  form,
}: CrudLayoutProps<ListData, CreateData, UpdateData>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const titleModal = useTitleModal();
  const descriptionModal = useDescriptionModal();
  const submitButtonText = useSubmitButtonText();
  const createButtonText = useCreateButtonText();
  const sendingButtonText = useSendingButtonText();
  const deleteId = useDeleteId();
  const editId = useEditId();
  const openEditModal = useOpenEditModal();
  const { setDeleteId, setOpenEditModal, setEditId } = useCrudLayoutActions();

  const isEditMode = useMemo(() => {
    return editId !== null;
  }, [editId]);

  const {
    listData,
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
  });

  useEffect(() => {
    if (openEditModal) {
      form.reset(listData.find((item: ListData) => item._id === editId));
      setIsModalOpen(true);
    }
  }, [editId, form, listData, openEditModal]);

  useEffect(() => {
    if (isModalOpen && !openEditModal) {
      form.reset({});
      Object.keys(form.getValues()).forEach((key) => {
        form.setValue(key, "");
      });
    }
  }, [isModalOpen, openEditModal, form]);

  const onSubmit = useCallback(
    async (data: CreateData | UpdateData) => {
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
      setIsModalOpen(false);
      setOpenEditModal(false);
      setEditId(null);
    },
    [
      createActionRequest,
      updateActionRequest,
      isEditMode,
      setIsModalOpen,
      setOpenEditModal,
      setEditId,
    ]
  );

  const onClickCreate = useCallback(() => {
    setOpenEditModal(false);
    setIsModalOpen(true);
    setEditId(null);
  }, [setIsModalOpen, setOpenEditModal, setEditId]);

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

  return (
    <div className="container mx-auto p-4 space-y-6 bg-white rounded-md">
      <div className="flex justify-between items-center md:flex-row flex-col gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={onClickCreate} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> {createButtonText}
        </Button>
      </div>

      <Dialog
        open={openEditModal || isModalOpen}
        onOpenChange={(isOpen) => {
          setOpenEditModal(isOpen);
          setIsModalOpen(isOpen);
          if (!isOpen) {
            setEditId(null);
          }
        }}
      >
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
        columns={columns}
        isLoading={isLoading}
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
