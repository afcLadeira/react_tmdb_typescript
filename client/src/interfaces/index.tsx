export interface ProductionCompanyInterface {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface GenreInterface {
  id: number;
  name: string;
}

export interface MovieInterface {
  id: number;
  title: string;
  homepage: string;
  name?: string;
  poster_path: string;
  profile_path?: string;
  media_type?: string;
  original_title: string;
  overview: string;
  tagline: string;
  original_language: string;
  runtime: number;
  release_date: string;
  budget: number;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: GenreInterface[];
  production_companies: ProductionCompanyInterface[];
  revenue: number;
  status: string;
  credit_id?: string;
}

export interface CreditsCastInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  original_name: string;
  profile_path:string;
  name: string;
}

export interface CreditsCrewInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  name:string;
}

export interface PersonCreditsInterface {
  cast: CreditsCastInterface[];
  crew: CreditsCrewInterface[];
}

export interface PagesInterface {
  page: number;
  results: MovieInterface[];
  total_pages: number;
  total_results: number;
  nextPage: number;
}
export interface ListsInterface {
  _id: string;
  name: string;
  description: string;
  userId: number;
  movies: MovieInterface[];
  __v: number;
}

export interface NewListInterface {
  name: string;
  description: string;
  userId: number | undefined;
  movies: MovieInterface[];
}

export interface PersonDetailsInterface {
  name: string;
  birthday: string;
  biography: string;
  place_of_birth: string;
  profile_path: string;
}


export interface AllPersonCreditsInterface {
  name: string;
  birthday: string;
  biography: string;
  place_of_birth: string;
  profile_path: string;
  cast: CreditsCastInterface[];
  crew: CreditsCrewInterface[];
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime?: any;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Logo {
  path: string;
  aspect_ratio: number;
}

export interface Network2 {
  id: number;
  logo: Logo;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  networks: Network2[];
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TVDetailsInterface {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air?: any;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}


export interface SearchResultsInterface {
  page: number;
  results: MovieInterface[];
  total_pages: number;
  total_results: number;
}

