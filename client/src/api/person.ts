import { useQueries, UseQueryOptions } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {AllPersonCreditsInterface } from "../interfaces";
import { axiosFetch } from "./fetch";

export function useGetAllPersonInfo(
  id : string | undefined,
  detailsURL : string,
  tvCreditsURL : string,
  movieCreditsURL : string
) {
  const axiosPrivate = useAxiosPrivate();

  
  
  return useQueries<UseQueryOptions<AllPersonCreditsInterface, unknown, unknown>[]>([
    {
      queryKey: ["person", id],
      queryFn: async () => axiosFetch(detailsURL, axiosPrivate),
      //também se pode fazer assim para cada query em vez do interface todo junto
     // select: (data: PersonDetailsInterface) => data,
      enabled: !!id
    },
    {
      queryKey: ["person_tv_credits", id],
      queryFn: async () => axiosFetch(tvCreditsURL, axiosPrivate),
      enabled: !!id
    },
    {
      queryKey: ["person_movie_credits", id],
      queryFn: async () => axiosFetch(movieCreditsURL, axiosPrivate),
      enabled: !!id
    },
  ]);
}
