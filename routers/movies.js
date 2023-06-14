const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/const');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(URL_REGEX).messages({
        'string.pattern.base': 'Введите корректный url постера',
      }),
      trailerLink: Joi.string().required().pattern(URL_REGEX).messages({
        'string.pattern.base': 'Введите корректный url трейлера',
      }),
      thumbnail: Joi.string().required().pattern(URL_REGEX).messages({
        'string.pattern.base': 'Введите корректный url превью',
      }),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = router;
