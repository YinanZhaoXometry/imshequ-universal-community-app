const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: String,
  avatar: String,
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  hash: String,
  salt: String
})

const User = mongoose.model('User', UserSchema)
module.exports = User