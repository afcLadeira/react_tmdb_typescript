import {
  useQueries,
} from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { PersonCreditsInterface, TVDetailsInterface } from "../interfaces";
import { axiosFetch } from "./fetch";



export function useGetTvDetailsAndCredits(id : string | undefined, tvDetailsURL: string, tvCreditsURL:string) {

  const axiosPrivate = useAxiosPrivate();

  return useQueries([
    {
      queryKey: ["tvshow", id],
      queryFn: async () => axiosFetch(tvDetailsURL,axiosPrivate),
      select: (data: TVDetailsInterface) => data,
      enabled: false,
    },
    {
      queryKey: ["tvshow_credits", id],
      queryFn: async () => axiosFetch(tvCreditsURL,axiosPrivate),
      enabled: false,
      select: (data : PersonCreditsInterface) => {
        data.cast.sort((a, b) => b.popularity - a.popularity);
        return data;
      },
    },
  ]);
}