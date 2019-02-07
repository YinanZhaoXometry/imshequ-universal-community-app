const Comment = require('../models/comment')
const Article = require('../models/article')
const marked = require('marked')

module.exports = {
  async fetch (req, res, next) {
    try {
      let _id = req.query.id
      let doc = await Article.findOne({_id}, 'comments')
        .populate({
          path: 'comments',
          populate: { path: 'fromWhom', select: '-password' }
        })
      let comments = doc.comments
      if (!comments) comments = []
      res.json({ comments })
    } catch (err) {
      next(err)
    }
  },

  async post (req, res, next) {
    try {
      let { articleId, content } = req.body
      if(!content.trim) {
        let err = new Error('信息不全')
        err.status = 400
        return next(err)
      }
      let userId = req.user.id
      let rawContent = content
      let htmlContent = marked(rawContent)
      let doc = await Comment.create({ article: articleId, rawContent, htmlContent, fromWhom: userId })
      await Article.updateOne({ _id: articleId }, { $push: {comments: doc._id} })
      res.end()
    } catch (err) {
      next(err)
    }
  },

  async delete (req, res, next) {
    try {
      let {articleId} = req.query
      let commentId = req.params.id
      let result = await Comment.deleteOne({_id: commentId})
      if (result.deletedCount === 0) return next(new Error('删除不成功'))
      let articleDoc = await Article.findOne({_id: articleId})
      let index = articleDoc.comments.indexOf(commentId)
      articleDoc.comments.splice(index, 1)
      await articleDoc.save()
      res.end()
    } catch (err) {
      next(err)
    }
  }
}