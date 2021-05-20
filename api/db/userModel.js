const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  location: {
    latitude: {
      type: String,
      default: ''
    },
    longitude: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    fullAddress: {
      type: String,
      default: ''
    }
  },
  about: {
    type: String,
    default: ''
  },
  favourites: Array,
  login: {
    type: String,
    default: ''
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  contacts:
  {
    telegram: {
      type: String,
      default: ''
    },
    telephone: {
      type: String,
      default: ''
    }
  },
  checkEmail: String,
  role: String,
  imageUrl: {
    type: String,
    default: 'http://localhost:8080/images/avaplaceholder.jpg'
  }
});

const User = mongoose.model('User', userSchema)

module.exports = User
