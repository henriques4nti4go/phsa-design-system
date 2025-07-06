import { create } from "zustand";

export type CrudLayoutStore = {
  titleModal?: string;
  descriptionModal?: string;
  submitButtonText?: string;
  createButtonText?: string;
  isEditMode: boolean;
  deleteId: string | null;
  editId: string | null;
  openEditModal: boolean;
  sendingButtonText?: string;
  actions: {
    setTitleModal: (title: string) => void;
    setDescriptionModal: (description: string) => void;
    setSubmitButtonText: (text: string) => void;
    setCreateButtonText: (text: string) => void;
    setIsEditMode: (isEditMode: boolean) => void;
    setDeleteId: (id: string | null) => void;
    setEditId: (id: string | null) => void;
    setOpenEditModal: (open: boolean) => void;
    setSendingButtonText: (text?: string) => void;
  };
};

export const useCrudLayoutStore = create<CrudLayoutStore>((set) => ({
  titleModal: "",
  descriptionModal: "",
  submitButtonText: "Salvar",
  createButtonText: "Criar",
  isEditMode: false,
  deleteId: null,
  editId: null,
  openEditModal: false,
  actions: {
    setTitleModal: (title) => set({ titleModal: title }),
    setDescriptionModal: (description) =>
      set({ descriptionModal: description }),
    setSubmitButtonText: (text) => set({ submitButtonText: text }),
    setCreateButtonText: (text) => set({ createButtonText: text }),
    setIsEditMode: (isEditMode) => set({ isEditMode }),
    setDeleteId: (id) => set({ deleteId: id }),
    setEditId: (id) => set({ editId: id }),
    setOpenEditModal: (open) => set({ openEditModal: open }),
    setSendingButtonText: (text) => set({ sendingButtonText: text }),
  },
}));

export const useCrudLayoutActions = () =>
  useCrudLayoutStore((state) => state.actions);

export const useTitleModal = () =>
  useCrudLayoutStore((state) => state.titleModal);

export const useDescriptionModal = () =>
  useCrudLayoutStore((state) => state.descriptionModal);

export const useSubmitButtonText = () =>
  useCrudLayoutStore((state) => state.submitButtonText);

export const useCreateButtonText = () =>
  useCrudLayoutStore((state) => state.createButtonText);

export const useIsEditMode = () =>
  useCrudLayoutStore((state) => state.isEditMode);

export const useDeleteId = () => useCrudLayoutStore((state) => state.deleteId);

export const useEditId = () => useCrudLayoutStore((state) => state.editId);

export const useOpenEditModal = () =>
  useCrudLayoutStore((state) => state.openEditModal);

export const useSendingButtonText = () =>
  useCrudLayoutStore((state) => state.sendingButtonText);
