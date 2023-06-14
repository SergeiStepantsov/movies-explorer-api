const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const { login, createUser } = require('../controllers/users');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(2),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required().messages({
        'string.email': 'Введите корректный email',
      }),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

module.exports = router;
