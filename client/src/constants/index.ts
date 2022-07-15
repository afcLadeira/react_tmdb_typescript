import { HOMEPAGE_URL } from "./homepage";

export const API_URl = "https://api.themoviedb.org/";

export const TMDB_BASE_URL = 'https://www.themoviedb.org/'

export const API_KEY = "";



export const API_WRAPPER_URL = process.env.NODE_ENV === 'production' ? `${HOMEPAGE_URL}/api/tmdb` : "http://localhost:3001/api/tmdb"


//export const API_MOST_POPULAR_DIRECT = `${API_URl}3/movie/popular?api_key=${API_KEY}`;
export const API_MOST_POPULAR= `${API_WRAPPER_URL}/mostpopular`;

//TV

export const getTVDetailsEndpoint = (id:string | number | undefined) : string => `${API_WRAPPER_URL}/tv/${id}`;


export const getTVCreditsEndpoint = (id:string | number | undefined) => `${API_WRAPPER_URL}/tv/${id}/credits`;
//MOVIE

export const getMovieDetailsEndpoint = (id:string | number | undefined) =>
  `${API_WRAPPER_URL}/movie/${id}`;


export const getMovieCreditsEndpoint = (id:string | number | undefined) =>
  `${API_WRAPPER_URL}/movie/${id}/credits`;
//PERSON


export const getPersonDetailsEndpoint = (id:string | number | undefined) =>
  `${API_WRAPPER_URL}/person/${id}`;



export const getPersonTVCreditsEnpoint = (id:string | number | undefined) =>
  `${API_WRAPPER_URL}/person/${id}/tv_credits`;


  
export const getPersonMovieCreditsEnpoint = (id:string | number | undefined) =>
  `${API_WRAPPER_URL}/person/${id}/movie_credits`;
//SEARCH

  export const getSearchEndpoint = (multi : boolean | undefined | null, searchString : string) =>
  `${API_WRAPPER_URL}/search/${
    multi === true? "multi" : "movie"
  }?query=${searchString}`;

export const POSTER_URL = `${TMDB_BASE_URL}/t/p/w440_and_h660_face/`;

export const PROFILE_URL = `${TMDB_BASE_URL}/t/p/w276_and_h350_face/`;

// ROUTES
export const RESULTS_ROUTE = "/results?search=";

export const PERSON_ROUTE = "/person/";

export const MOVIE_ROUTE = "/movie/";

export const TV_ROUTE = "/tvshow/";

export const MYLISTS_ROUTE = "/mylists"
// END OF ROUTES


export const PAGES : { [char: string]: string } = { person: "person", movie: "movie", tv: "tvshow" } ;

export const TYPESCOLORS  : { [char: string]: string }  = { person: "#314d63", movie: "#0091a0", tv: "#f08976" };

