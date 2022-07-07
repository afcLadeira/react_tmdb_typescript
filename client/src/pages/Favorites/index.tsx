import { useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard";
import { Heading1 } from "../../styles";
import { RootState } from "../../redux/store";
import { MovieInterface } from "../../interfaces";


export function FavoritesPage() {
  
 
  const { favoriteMovies } = useSelector((state : RootState) => state.favorites);

  return (
    <div>
      <Heading1>My Favorites</Heading1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {favoriteMovies &&
          favoriteMovies.map((item : MovieInterface) => (
            <MovieCard key={item.id} movie={item}></MovieCard>
          ))}
      </div>
    </div>
  );
}
