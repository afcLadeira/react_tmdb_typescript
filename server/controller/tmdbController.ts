import { Request, Response } from "express";
import { getErrorMessage } from "../helpers/errorHelper";

const axios = require("axios").default;

const API_KEY = process.env.TMDB_API_KEY;

const API_URl = "https://api.themoviedb.org/";

const API_MOST_POPULAR = `${API_URl}3/movie/popular?api_key=${API_KEY}`;


const getTVDetailsEndpoint = (id : string) => `${API_URl}3/tv/${id}?api_key=${API_KEY}&language=en-US`;

const getTVCreditsEndpoint = (id : string) => `${API_URl}3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`;


const getMovieDetailsEndpoint = (id : string) =>
  `${API_URl}3/movie/${id}?api_key=${API_KEY}&language=en-US`;

const getMovieCreditsEndpoint = (id : string) =>
  `${API_URl}3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;


const getPersonDetailsEndpoint = (id : string) =>
  `${API_URl}3/person/${id}?api_key=${API_KEY}&language=en-US`;

const getPersonTVCreditsEnpoint = (id : string) =>
  `${API_URl}3/person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`;

 const getPersonMovieCreditsEnpoint = (id : string) =>
  `${API_URl}3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`;

const getSearchEndpoint = (multi : string, searchString : any) =>
  `${API_URl}3/search/${multi}?api_key=${API_KEY}&language=en-US&query=${searchString}&page=1&include_adult=false`;


const getPopular = async (req :Request, res : Response) => {
  let page = req.query.page;

  try {
    let urlPage = page ? "&page=" + page : "";

    let result = await axios.get(`${API_MOST_POPULAR}${urlPage}`);

    res.status(200).json(result.data);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};

const getTvDetails = async (req :Request, res : Response)  => {
  let {id} = req.params;
  try {

    let result = await axios.get(getTVDetailsEndpoint(id));

    res.status(200).json(result.data);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};
const getTvCredits = async (req :Request, res : Response)  => {
  let {id} = req.params;

  try {

    let result = await axios.get(getTVCreditsEndpoint(id));

    res.status(200).json(result.data);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};
const getMovieDetails = async (req :Request, res : Response)  => {
  let {id} = req.params;
  try {

    let result = await axios.get(getMovieDetailsEndpoint(id));

    res.status(200).json(result.data);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};
const getMovieCredits = async (req :Request, res : Response)  => {
  let {id} = req.params;

  try {

    let result = await axios.get(getMovieCreditsEndpoint(id));

    res.status(200).json(result.data);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};
const getPersonDetails = async (req :Request, res : Response)  => {
  let {id} = req.params;
  try {

    let result = await axios.get(getPersonDetailsEndpoint(id));

    res.status(200).json(result.data);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};
const getPersonMovieCredits = async (req :Request, res : Response)  => {
  let {id} = req.params;

  try {

    let result = await axios.get(getPersonMovieCreditsEnpoint(id));

    res.status(200).json(result.data);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};
const getPersonTVCredits = async (req :Request, res : Response)  => {
  let {id} = req.params;

  try {

    let result = await axios.get(getPersonTVCreditsEnpoint(id));

    res.status(200).json(result.data);
  } catch (error) {
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};

const search = async (req :Request, res : Response)  => {

  let {type} = req.params;
  let {query} = req.query

  

  try {

    let result = await axios.get(getSearchEndpoint(type,query));

    res.status(200).json(result.data);
  } catch (error) {
  
    return res.sendStatus(500).json({ message: getErrorMessage(error) });
  }
};

module.exports = { getPopular , 
    getTvDetails , 
    getTvCredits , getMovieDetails , getMovieCredits,
    getPersonDetails,getPersonMovieCredits, getPersonTVCredits , search};
