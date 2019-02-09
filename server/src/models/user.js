const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  site: { type: String },
  location: { type: String },
  signature: { type:String },
  avatar: { type:String },
  liked: [{ type: ObjectId, ref: 'Article' }],
  saved: [{ type: ObjectId, ref: 'Article' }],
  archived: [{ type: ObjectId, ref: 'Article' }],
  following: [{ type: ObjectId, ref: 'User' }],
  followers: [{ type: ObjectId, ref: 'User' }],
  isBlocked: { type: Boolean, default: false },
  // blockedUsers: [{ type: ObjectId, ref: 'User' }],
})

const User = mongoose.model('User', UserSchema)
module.exports = User