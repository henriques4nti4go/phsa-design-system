import { useEffect, useMemo } from "react";
import {
  useCreateButtonText,
  useCrudLayoutActions,
  useDeleteId,
  useEditId,
  useDescriptionModal,
  useIsEditMode,
  useSubmitButtonText,
  useTitleModal,
  useOpenEditModal,
} from "../../store/CrudLayoutStore";

type CommonProps = {
  titleModal: string;
  descriptionModal?: string;
  submitButtonText: string;
  sendingButtonText?: string;
};

type UseCrudLayoutProps = {
  create?: CommonProps;
  update?: CommonProps;
  delete?: CommonProps;
  createButtonText: string;
};

export function useCrudLayout(props: UseCrudLayoutProps) {
  const deleteId = useDeleteId();
  const editId = useEditId();
  const titleModal = useTitleModal();
  const descriptionModal = useDescriptionModal();
  const submitButtonText = useSubmitButtonText();
  const createButtonText = useCreateButtonText();
  const isEditMode = useIsEditMode();
  const openEditModal = useOpenEditModal();
  const {
    setTitleModal,
    setDescriptionModal,
    setSubmitButtonText,
    setCreateButtonText,
    setIsEditMode,
    setDeleteId,
    setEditId,
    setOpenEditModal,
    setSendingButtonText,
  } = useCrudLayoutActions();

  const key = useMemo(() => {
    if (editId) return "update";
    if (deleteId) return "delete";
    return "create";
  }, [editId, deleteId]);

  useEffect(() => {
    const data = props[key] as CommonProps;

    if (data) {
      setTitleModal(data.titleModal);
      setDescriptionModal(data.descriptionModal || "");
      setSubmitButtonText(data.submitButtonText);
      setCreateButtonText(props.createButtonText);
      setSendingButtonText(data.sendingButtonText);
    }
  }, [
    props,
    key,
    setTitleModal,
    setDescriptionModal,
    setSubmitButtonText,
    setCreateButtonText,
    setSendingButtonText,
    deleteId,
  ]);

  return {
    setTitleModal,
    setDescriptionModal,
    setSubmitButtonText,
    setCreateButtonText,
    setIsEditMode,
    setDeleteId,
    setEditId,
    setOpenEditModal,
    titleModal,
    descriptionModal,
    submitButtonText,
    createButtonText,
    isEditMode,
    deleteId,
    editId,
    openEditModal,
  };
}
