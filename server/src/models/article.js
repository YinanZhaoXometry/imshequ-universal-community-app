
const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  title: String,
  description: String,
  body: String,
  favoritesCount: { type: Number, default: 0 },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tagList: [{ type: String }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Article = mongoose.model('Article', ArticleSchema)
export default Article