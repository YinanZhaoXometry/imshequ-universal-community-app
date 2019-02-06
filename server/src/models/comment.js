const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'article'
  }
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment