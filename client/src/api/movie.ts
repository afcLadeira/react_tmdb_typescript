import { useQuery } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function useGetMovieDetails(url: string, id: string | undefined) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(
    ["movie", id],
    async () => {
      const { data } = await axiosPrivate.get(url);
      return data;
    },
    { enabled: !!id }
  );
}

export function useGetMovieCredits(
  url: string,
  id: number | string,
  details: string
) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(
    ["movie_credits", id],
    async () => {
      const { data } = await axiosPrivate.get(url);
      return data;
    },
    { enabled: !!details }
  );
}
