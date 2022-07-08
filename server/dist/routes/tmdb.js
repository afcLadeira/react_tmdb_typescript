"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tmdbController = require('../controller/tmdbController');
const app = (0, express_1.default)();
app.get('/search/:type', tmdbController.search);
app.get('/mostpopular', tmdbController.getPopular);
app.get('/tv/:id', tmdbController.getTvDetails);
app.get('/tv/:id/credits', tmdbController.getTvCredits);
app.get('/movie/:id', tmdbController.getMovieDetails);
app.get('/movie/:id/credits', tmdbController.getMovieCredits);
app.get('/person/:id', tmdbController.getPersonDetails);
app.get('/person/:id/movie_credits', tmdbController.getPersonMovieCredits);
app.get('/person/:id/tv_credits', tmdbController.getPersonTVCredits);
module.exports = app;
