import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import noImage from "../../assets/noImage.png";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";
import { PAGES, POSTER_URL, PROFILE_URL, TYPESCOLORS } from "../../constants";
import AddMovieToList from "../AddMovieToList";
import { Ribbon } from "../../styles";
import { useTheme } from "styled-components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { MovieInterface } from "../../interfaces";
import { RootState } from "../../redux/store";
import { ThemeType } from "../../styles/globalStyles";

export default function MovieCard({ movie } : {movie: MovieInterface}) {
  
  let navigate = useNavigate();
  let theme = useTheme() as ThemeType;
  const favorites = useSelector((state : RootState) => state.favorites);
 

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate()

  const { addToFavorites, removeFromFavorites } = bindActionCreators(
    actionCreators,
    dispatch
  );

  function onClickDetails(id : number, media_type : string) {
    navigate(`/${PAGES[media_type] ? PAGES[media_type] : "movie"}/${id}`);
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          !(movie.profile_path || movie.poster_path)
            ? noImage
            : movie.media_type === "person"
            ? `${PROFILE_URL}${movie.profile_path}`
            : `${POSTER_URL}${movie.poster_path}`
        }
      />
      <Card.Body style={{ backgroundColor: theme.background }}>

        <div style={{position : 'absolute'  , left:10 , top :10 ,border:'2px solid white', borderRadius: '50%' , backgroundColor: 'teal' , minWidth:45, textAlign:'center' , color: 'white' , padding:6 , fontWeight:800}}>{movie.vote_average}</div>
        <Ribbon
          color={
            TYPESCOLORS[movie.media_type!]
              ? TYPESCOLORS[movie.media_type!]
              : "#0091a0"
          }
        >
          {movie.media_type ? movie.media_type : "movie"}
        </Ribbon>

        <Card.Title>
       
            {movie.media_type === "person" ? movie.name : movie.original_title}
         
        </Card.Title>
        <Card.Text>
          {movie.overview}
        </Card.Text>

        <Button
          variant="primary"
          onClick={() => onClickDetails(movie.id, movie.media_type!)}
        >
          Details
        </Button>
        <AddMovieToList movie={movie}></AddMovieToList>
        {favorites && favorites.favoriteMovies.find((fav : {id:number}) => fav.id === movie.id) ? (
          <Button 
          data-testid="buttonremovefav"
          variant="danger" onClick={() => removeFromFavorites(movie , axiosPrivate)}>
            - Favorites
          </Button>
        ) : (
          <Button
          data-testid="buttonaddfav"
            variant="outline-danger"
            onClick={() => addToFavorites(movie , axiosPrivate)}
          >
            + Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
