const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// 子评论Schema
const SubCommentSchema = new mongoose.Schema({
  isReplyToParent: { type: Boolean },
  rawContent: { type: String, required: true },
  htmlContent: { type: String, required: true },
  fromWhom: { type: ObjectId, ref: 'User' },
  toWhom: { type: ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  isAuthor: { type: Boolean, defualt: false }
})

// 父评论Schema
const CommentSchema = new mongoose.Schema({
  article: { type: ObjectId, ref: 'Article' },
  rawContent: { type: String, required: true },
  htmlContent: { type: String, required: true },
  fromWhom: { type: ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  isAuthor: { type: Boolean, defualt: false },
  isTopPinned: { type: Boolean, default: false},
  subComments: [ SubCommentSchema ]
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment