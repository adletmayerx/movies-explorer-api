const movieRouter = require('express').Router();
const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');
const {
  movieValidation,
  movieIdValidation,
} = require('../middlewares/validation');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', movieValidation, createMovie);
movieRouter.delete('/movies/:id', movieIdValidation, deleteMovie);

module.exports = movieRouter;
