import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieCredits, useGetMovieDetails } from "../../api/movie";
import Credits from "../../components/Credits";
import MovieDetails from "../../components/MovieDetails";
import MySpinner from "../../components/Spinner";
import {
  API_WRAPPER_URL,
  getMovieCreditsEndpoint,
  getMovieDetailsEndpoint,
  MOVIE_ROUTE,
  POSTER_URL,
} from "../../constants";
import useFetch from "../../hooks/useFetch";
import noImage from "../../assets/noImage.png";
import { MovieInterface } from "../../interfaces";
import { ThemeType } from "../../styles/globalStyles";
import { useTheme } from "styled-components";
import { Heading2 } from "../../styles";

export default function Movie() {
  let { id } = useParams();

  //DEPENDENT QUERIES
  const { data, error, isLoading } = useGetMovieDetails(
    getMovieDetailsEndpoint(id),
    id
  );

  const {
    data: credits,
    // error: error_credits,
    // isLoading: isLoading_credits,
  } = useGetMovieCredits(getMovieCreditsEndpoint(id), id!, data);

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  if (isLoading) {
    return <MySpinner></MySpinner>;
  }

  return (
    <>
      {data && <MovieDetails data={data}></MovieDetails>}
      {id ? <MovieVideos id={id}></MovieVideos> : null}
      {id ? <SimilarMovies id={id}></SimilarMovies> : null}
      {credits && <Credits credits={credits}></Credits>}
    </>
  );
}

const SimilarMovies = ({ id }: { id: string }) => {
  let navigate = useNavigate();
  let theme = useTheme() as ThemeType;

  const [url, setUrl] = useState("");

  const { data, loading, error } = useFetch<{ results: MovieInterface[] }>(url);
 

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (id: string) => {
    setUrl(`${API_WRAPPER_URL}/movie/${id}/similar`);
    setIsOpen(!isOpen);
  };

  return (
    <div style={{border: `1px solid ${theme.text}` , borderRadius:5}} >
      <div style={{padding:5}} onClick={() => handleClick(id)}>Similar movies</div>
      {isOpen && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 , padding:5 }}>
          {data?.results.map((movie: MovieInterface) => (
            <div
              onClick={() => navigate(`${MOVIE_ROUTE}${movie.id}`)}
              className="zoom"
              style={{ maxWidth: 100 }}
              key={movie.id}
            >
              <Image
                width="100px"
                src={
                  movie.poster_path
                    ? `${POSTER_URL}${movie.poster_path}`
                    : noImage
                }
              ></Image>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const MovieVideos = ({id} : {id:string}) => {
  

  const { data, loading, error } = useFetch<{ results: any}>(`${API_WRAPPER_URL}/movie/${id}/videos`);
  
  const youtubeVideos = useMemo( () => { 
    if (data?.results) {
      
      return data.results.filter((m : any) => m.site === "YouTube")
    }
    else return []
  } , [data]) 

  return <div> <Heading2 style={{ textAlign: "center" }}>Videos</Heading2><div style={{display:'flex' , flexWrap:'wrap' , gap:20}}>{youtubeVideos.map((v : any) => (<div>
    <iframe
      src={`https://www.youtube.com/embed/${v.key}`}
      width={500}
      height={300}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="video"
    />{" "}
  </div>))}</div></div>
} 

//deprecated
export function MovieOld() {
  let { id } = useParams();

  const [state, setState] = useState({
    loading: true,
    data: null,
    credits: null,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(getMovieDetailsEndpoint(id));

      const { data: credits } = await axios.get(getMovieCreditsEndpoint(id));

      setState((prevState) => ({
        ...prevState,
        loading: false,
        data,
        credits,
      }));
    }

    fetchData();
  }, [id]);

  if (state.loading) {
    return <MySpinner></MySpinner>;
  }

  return (
    <>
      {state.data && <MovieDetails data={state.data}></MovieDetails>}

      {state.credits && <Credits credits={state.credits}></Credits>}
    </>
  );
}
