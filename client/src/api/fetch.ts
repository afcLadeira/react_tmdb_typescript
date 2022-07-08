

import { AxiosInstance } from "axios";

export const axiosFetch = async (url: string , axiosPrivate : AxiosInstance)  => {
  
    const { data } = await axiosPrivate.get(url);
    return data;
  };
  




