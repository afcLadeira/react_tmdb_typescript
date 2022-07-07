import { useQuery, useMutation, useQueryClient } from "react-query";

import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  MovieInterface,
  ListsInterface,
  NewListInterface,
} from "../interfaces";

export function useGetMyLists(url: string, userId: number | undefined) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(
    ["mylists", userId],
    async (): Promise<ListsInterface[]> => {
      const { data } = await axiosPrivate.get(url);
      return data;
    },
    { enabled: !!userId }
  );
}

export const useCreateList = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  return useMutation(
    async ({ url, list }: { url: string | null; list: NewListInterface }) => {
      if (!url) return [];
      const { data } = await axiosPrivate.post(url, list);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData<ListsInterface[]>(
          ["mylists", auth.id],
          (oldData): ListsInterface[] => {
            return [...oldData!, data];
          }
        );
        //queryClient.invalidateQueries("mylists");
      },
    }
  );
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  return useMutation(
    async (url: string | null) => {
      if (!url) return [];
      const { data } = await axiosPrivate.delete(url);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData<ListsInterface[]>(
          ["mylists", auth.id],
          (oldData): ListsInterface[] => {
            return oldData!.filter((d: ListsInterface) => d._id !== data._id);
          }
        );
        //queryClient.invalidateQueries("mylists");
      },
    }
  );
};
export const useAddMovieToList = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  return useMutation(
    async ({ url, movie }: { url: string | null; movie: MovieInterface }) => {
      if (!url) return [];
      const { data } = await axiosPrivate.put(url, movie);
      return data;
    },
    {
      onSuccess: (data, variables, onSuccess) => {
        // queryClient.setQueryData(['mylists', { id: variables.id }], data)
        queryClient.invalidateQueries(["mylists", auth.id]);
      },
    }
  );
};
