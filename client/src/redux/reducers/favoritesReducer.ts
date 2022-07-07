import { Reducer } from "redux";
import { MovieInterface } from "../../interfaces";

let initialState = {
  userId: null,
  favoriteMovies: [],
};

interface FavoritesReducerState {
  userId : number | null,
  favoriteMovies: MovieInterface[]
}

const reducer : Reducer<FavoritesReducerState> = (state = initialState, action : any) => {
  switch (action.type) {
    case "getFavorites":
      return { ...state, ...action.payload };
    case "addFavorite":
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies, action.payload],
      };
    case "removeFavorite":
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.filter(
          (fav : any) => fav.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default reducer;
