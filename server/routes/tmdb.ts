import express from 'express';
const tmdbController = require('../controller/tmdbController');

const app = express();


app.get('/search/:type', tmdbController.search);

app.get('/mostpopular', tmdbController.getPopular);
app.get('/tv/:id', tmdbController.getTvDetails);
app.get('/tv/:id/credits', tmdbController.getTvCredits);
app.get('/movie/:id', tmdbController.getMovieDetails);
app.get('/movie/:id/credits', tmdbController.getMovieCredits);
app.get('/movie/:id/similar', tmdbController.getSimilarMovies);
app.get('/movie/:id/videos', tmdbController.getMovieVideos);
app.get('/person/:id', tmdbController.getPersonDetails);
app.get('/person/:id/movie_credits', tmdbController.getPersonMovieCredits);
app.get('/person/:id/tv_credits', tmdbController.getPersonTVCredits);




module.exports = app;

