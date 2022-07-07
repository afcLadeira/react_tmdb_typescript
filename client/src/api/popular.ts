
import {
  useInfiniteQuery,
} from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { PagesInterface } from "../interfaces/index"
import { AxiosInstance } from "axios";


const fetchPopular = async (url : string, pageParam : number = 1 ,axiosPrivate : AxiosInstance) : Promise<PagesInterface>  => {
  const { data } = await axiosPrivate.get(url + "?page=" + pageParam);
  return {
    ...data,
    nextPage: data.total_pages === data.page ? undefined : data.page + 1,
  };
};

export function useGetMostPopular(url : string) {

  const axiosPrivate = useAxiosPrivate();
  
  return useInfiniteQuery(
    "movies",
    ({ pageParam = 1 }) => fetchPopular(url, pageParam , axiosPrivate),
    {
      getNextPageParam: (lastPage : PagesInterface, pages) => {
        return lastPage.nextPage;
      },
    }
  );
}
