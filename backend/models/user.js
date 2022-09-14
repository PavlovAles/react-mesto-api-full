const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const AuthenticationError = require('../errors/AuthenticationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => {
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;
        return regex.test(v);
      },
      message: 'Не валидная ссылка на аватар',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Передан некорректный email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new AuthenticationError('Неправильные почта или пароль');
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new AuthenticationError('Неправильные почта или пароль');
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
