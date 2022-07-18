"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHelper_1 = require("../helpers/errorHelper");
const axios = require("axios").default;
const API_KEY = process.env.TMDB_API_KEY;
const API_URl = "https://api.themoviedb.org/";
const API_MOST_POPULAR = `${API_URl}3/movie/popular?api_key=${API_KEY}`;
const getTVDetailsEndpoint = (id) => `${API_URl}3/tv/${id}?api_key=${API_KEY}&language=en-US`;
const getTVCreditsEndpoint = (id) => `${API_URl}3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`;
const getMovieDetailsEndpoint = (id) => `${API_URl}3/movie/${id}?api_key=${API_KEY}&language=en-US`;
const getSimilarMoviesEndpoint = (id) => `${API_URl}3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`;
const getMovieCreditsEndpoint = (id) => `${API_URl}3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
const getMovieVideosEndpoint = (id) => `${API_URl}3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
const getPersonDetailsEndpoint = (id) => `${API_URl}3/person/${id}?api_key=${API_KEY}&language=en-US`;
const getPersonTVCreditsEnpoint = (id) => `${API_URl}3/person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`;
const getPersonMovieCreditsEnpoint = (id) => `${API_URl}3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`;
const getSearchEndpoint = (multi, searchString) => `${API_URl}3/search/${multi}?api_key=${API_KEY}&language=en-US&query=${searchString}&page=1&include_adult=false`;
const getPopular = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = req.query.page;
    try {
        let urlPage = page ? "&page=" + page : "";
        let result = yield axios.get(`${API_MOST_POPULAR}${urlPage}`);
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getTvDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getTVDetailsEndpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getTvCredits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getTVCreditsEndpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getMovieDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getMovieDetailsEndpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getSimilarMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getSimilarMoviesEndpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getMovieVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getMovieVideosEndpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getMovieCredits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getMovieCreditsEndpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getPersonDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getPersonDetailsEndpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getPersonMovieCredits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getPersonMovieCreditsEnpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const getPersonTVCredits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let result = yield axios.get(getPersonTVCreditsEnpoint(id));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { type } = req.params;
    let { query } = req.query;
    try {
        let result = yield axios.get(getSearchEndpoint(type, query));
        res.status(200).json(result.data);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
module.exports = { getPopular, getMovieVideos,
    getTvDetails,
    getTvCredits, getMovieDetails, getMovieCredits,
    getPersonDetails, getPersonMovieCredits, getPersonTVCredits, search, getSimilarMovies };
