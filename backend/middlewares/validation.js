const { celebrate, Joi } = require('celebrate');

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

module.exports.idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regex).message('Invalid image link'),
  }),
});

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regex).message('Invalid avatar link'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.patchUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.patchUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regex).message('Invalid avatar link'),
  }),
});
