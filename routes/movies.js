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

movieRouter.get('/', getMovies);
movieRouter.post('/', movieValidation, createMovie);
movieRouter.delete('/:id', movieIdValidation, deleteMovie);

module.exports = movieRouter;
