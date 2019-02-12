const Article = require('../models/article')
const User = require('../models/user')
const marked = require('marked')

async function fetchAll (req, res, next) {
  let { offset, limit } = req.query
  offset = parseInt(offset)
  limit = parseInt(limit)
  let countQuery = Article.countDocuments({})
  let articlesQuery = Article.find({}, '-rawContent -htmlContent', {
    sort: {createdAt: -1}, limit, skip: offset
  }).populate('author', '-password')
  let [ articlesCount, articles ] = await Promise.all([ countQuery, articlesQuery ])
  res.json({ articlesCount, articles })
}

async function fetchOne (req, res, next) {
  let _id = req.params.id
  let updateQuery = Article.updateOne(
    {_id}, { $inc: {viewsCount: 1} }
  ) // 阅读量+1
  let findQuery = Article.findOne({_id}, {})
    .populate('author', '-password').lean()
  let [result, article] = await Promise.all([updateQuery, findQuery])
  if(result.nModified === 0 || !article) {
    res.sendStatus(400)
  } else {
    if (req.user) {
      let isLiked = await checkLiked(req.user.id, _id)
      article.isLiked = isLiked
    }
    res.json({article})
  }
}

async function checkLiked (userId, articleId) {
  let user = await User.findById(userId)
  if (user.liked.indexOf(articleId) !== -1) {
    return true
  } else {
    return false
  }
}

async function post (req, res, next) {
  let userId = req.user.id
  let { title, content, description } = req.body
  if ([title, description, content].some( elem => elem.trim() === '' )) {
    let err = new Error('文章信息不完整')
    err.status = 400
    return next(err)
  }
  let htmlContent = marked(content)
  let doc = await Article.create({ title, description, rawContent: content, htmlContent, author: userId })
  if (doc) {
    res.json({id: doc._id})
  }
}

async function deleteOne (req, res, next) {
  try {
    let _id = req.params.id
    let result = await Article.deleteOne({_id})
    if (result.deletedCount !== 0) {
      res.end()
    } else {
      res.status(400).send('删除文章错误')
    }
  } catch (err) {
    next(err)
  }
}

async function update (req, res, next) {
  try {
    let _id = req.params.id
    let {title, content, description} = req.body
    let htmlContent = marked(content)
    let doc = await Article.findOne({_id})
    doc = await doc.set({
      title, rawContent: content, htmlContent, description
    }).save()
    res.json({ id: doc._id })
  } catch (err) {
    next(err)
  }
}



async function toggleLike (req, res, next) {
  try {
    let userId = req.user.id
    let articleId = req.params.id
    let user = await User.findById(userId)
    let index = user.liked.indexOf(articleId)
    let isLiked = index !== -1
    if (isLiked) {
      // 如已被喜欢，则从喜欢列表中去除
      user.liked.splice(index, 1)
      user = await user.save()
      isLiked = false
      var operation = { $inc: {likesCount: -1} }
    } else {
      // 如未被喜欢，则加入喜欢列表
      user.liked.push(articleId)
      user = await user.save()
      isLiked = true
      operation = { $inc: {likesCount: 1} }
    }
    // 更新文章喜欢次数
    let result = await Article.updateOne( {_id: articleId}, operation)
    if (result.nModified === 0) {
      res.sendStatus(400)
    } else {
      let article = await Article.findById(articleId)
        .populate('author', '-password').lean()
      article.isLiked = isLiked
      res.json({article})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {fetchAll, fetchOne, post, deleteOne, update, toggleLike }