import { AxiosInstance } from "axios";
import { Dispatch } from "redux";

export const getFavorites = (data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: "getFavorites",
      payload: data,
    });
  };
};

export const addToFavorites = (item: any, axiosPrivate: AxiosInstance) => {
  return async (dispatch: Dispatch, getState: any) => {
    await axiosPrivate.post(
      `/api/favorites/${getState().favorites.userId}`,
      item
    );

    dispatch({
      type: "addFavorite",
      payload: item,
    });
  };
};

export const removeFromFavorites = (item: any, axiosPrivate: AxiosInstance) => {
  return async (dispatch: Dispatch, getState: any) => {
    await axiosPrivate.delete(
      `/api/favorites/${getState().favorites.userId}/${item.id}`
    );

    dispatch({
      type: "removeFavorite",
      payload: item,
    });
  };
};
