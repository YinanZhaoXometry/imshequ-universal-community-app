const mongoose = requrie('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, lowercase: true,  unique: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  bio: String,
  image: String,
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

export default User