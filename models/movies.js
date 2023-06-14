const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/const');

const { Schema } = mongoose;

const moviesSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(val) {
          return URL_REGEX.test(val);
        },
        message: 'Поле "image" должно быть валидным url-адресом',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(val) {
          return URL_REGEX.test(val);
        },
        message: 'Поле "trailerLink" должно быть валидным url-адресом',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(val) {
          return URL_REGEX.test(val);
        },
        message: 'Поле "thumbnail" должно быть валидным url-адресом',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movies', moviesSchema);
