
import { useCallback, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

export interface IFetchInfo<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}

// interface IData {
//   [key: string]: any;
// }

interface FReturn<T> extends IFetchInfo<T> {
    getData: (url : string) => void
}

const initialValue = {
  loading: false,
  data: null ,
  error: null,
};

const useFetch = <T>(url: string | null) :
// { loading: boolean;
//     data: T | null;
//     error: string | null
//     getData: (url : string) => void
// }  
FReturn<T> => {
  const [state, setState] = useState<IFetchInfo<T>>(initialValue);

  const getData = useCallback(
    async (url: string) => {
      setState((prevState) => ({ ...prevState, loading: true }));

      if (!url) return;

      try {
        const { data } = await axiosPrivate.get(url);
        setState((prevState) => ({ ...prevState, data }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          error: JSON.stringify(error),
        }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    },
    []
  );

  useEffect(() => {

    console.log(url)
    if (!url) return;

    getData(url);
  }, [url, getData]);

  return { ...state, getData };
};

export default useFetch;
