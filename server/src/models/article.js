const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: ObjectId, ref: 'User' },
  rawContent: { type: String, required: true },
  htmlContent: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  comments: [{ type: ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  isTopPinned: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isPublished: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article