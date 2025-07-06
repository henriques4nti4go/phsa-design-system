import { useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { ConfigResponse } from "@/service/config/types";

// esse ConfigResponse

export type useRequestProps<ListData, CreateData, UpdateData> = {
  queryKey: string;
  createRequest?: (data: CreateData) => Promise<ListData | void>;
  updateRequest?: (data: UpdateData) => Promise<ListData | void>;
  deleteRequest?: (id: string) => Promise<void>;
  listRequest: () => Promise<ListData[]>;
};

export function useRequest<
  ListData extends { _id: string },
  CreateData,
  UpdateData
>({
  queryKey,
  updateRequest = () => Promise.resolve(),
  deleteRequest = () => Promise.resolve(),
  createRequest = () => Promise.resolve(),
  listRequest = () => Promise.resolve([]),
}: useRequestProps<ListData, CreateData, UpdateData>) {
  const queryClient = useQueryClient();

  const queryKeys = useMemo(() => {
    return [queryKey];
  }, [queryKey]);

  // Query para buscar configurações
  const {
    data: listData = [],
    isLoading: isLoadingList,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: queryKeys,
    queryFn: listRequest,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Mutation para criar/atualizar configuração
  const {
    mutateAsync: createMutation,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys });
    },
  });

  const {
    mutateAsync: updateMutation,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys });
    },
  });

  // Mutation para excluir configuração
  const {
    mutateAsync: deleteMutation,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: (id: string) => deleteRequest(id),
    onSuccess: (_, id) => {
      // Atualizar o cache otimisticamente
      queryClient.setQueryData(queryKeys, (oldData: ListData[]) => {
        if (!oldData) return oldData;
        return oldData.filter((data: ListData) => data._id !== id);
      });
      // Invalidar a query para garantir consistência
      queryClient.invalidateQueries({ queryKey: queryKeys });
    },
  });

  const error =
    queryError || createError || updateError || deleteError
      ? (queryError || createError || updateError || deleteError) instanceof
        Error
        ? (queryError || createError || updateError || deleteError)?.message
        : "Erro desconhecido"
      : null;

  // Função para criar nova configuração
  const createActionRequest = useCallback(
    async (configData: CreateData) => {
      try {
        await createMutation(configData);
        return true;
      } catch (err) {
        console.error("Erro ao criar configuração:", err);
        return false;
      }
    },
    [createMutation]
  );

  // Função para atualizar configuração existente
  const updateActionRequest = useCallback(
    async (configData: UpdateData) => {
      try {
        await updateMutation(configData);
        return true;
      } catch (err) {
        console.error("Erro ao atualizar configuração:", err);
        return false;
      }
    },
    [updateMutation]
  );

  const deleteActionRequest = useCallback(
    async (key: string) => {
      try {
        await deleteMutation(key);
        return true;
      } catch (err) {
        console.error("Erro ao excluir configuração:", err);
        return false;
      }
    },
    [deleteMutation]
  );

  const refreshConfigs = useCallback(() => {
    return refetch();
  }, [refetch]);

  return {
    listData,
    isLoading: isLoadingList || isCreating || isUpdating || isDeleting,
    error,
    createActionRequest,
    updateActionRequest,
    deleteActionRequest,
    refreshConfigs,
  };
}
