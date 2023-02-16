const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const notExist = require('./notExist');
const { createUser, login, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const BadRequest = require('../errors/400-BadRequestError');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((link) => {
      if (isUrl(link, { require_protocol: true })) {
        return link;
      }
      throw new BadRequest('Некорректный адрес URL');
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signout', signOut);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.use('*', notExist);

module.exports = router;
