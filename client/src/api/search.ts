import { useQuery } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { SearchResultsInterface } from "../interfaces";

export function useSearchInfo(
  url: string,
  searchString: string | null,
  multi: boolean | null | undefined
) {
  const axiosPrivate = useAxiosPrivate();

  let searchUrl = url ? url : null;

  return useQuery(
    ["results", searchString, multi],
    async () => {
      const { data } = await axiosPrivate.get(url);
      return data;
    },
    {
      select: (data: SearchResultsInterface) => {
        data.results.sort((a, b) => b.popularity - a.popularity);
        return data;
      },
      enabled: !!searchUrl,
    }
  );
}
