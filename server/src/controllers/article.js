const Article = require('../models/article')
const User = require('../models/user')
const marked = require('marked')

module.exports = {
  async fetchAll (req, res, next) {
    let { offset, limit } = req.query
    offset = parseInt(offset)
    limit = parseInt(limit)
    let countQuery = Article.countDocuments({})
    let articlesQuery = Article.find({}, '-rawContent -htmlContent', {
      sort: {createdAt: -1}, limit, skip: offset
    }).populate('author')
    let [ articlesCount, articles ] = await Promise.all([ countQuery, articlesQuery ])
    res.json({ articlesCount, articles })
  },

  async fetchOne (req, res, next) {
    let _id = req.params.id
    let doc = await Article.findOne({_id}, '-rawContent').populate('author', '-password')
    if (doc) {
      res.json({article: doc})
    }
  },

  async post (req, res, next) {
    let userId = req.user.id
    let { title, description } = req.body
    let rawContent = req.body.content
    if ([title, description, rawContent].some( elem => elem.trim() === '' )) {
      let err = new Error('文章信息不完整')
      err.status = 400
      return next(err)
    }
    let htmlContent = marked(rawContent)
    let doc = await Article.create({ title, description, rawContent, htmlContent, author: userId })
    if (doc) {
      res.json({id: doc._id})
    }

  }
}