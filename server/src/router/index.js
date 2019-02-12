const router = require('express').Router()
const user = require('../controllers/user')
const article = require('../controllers/article')
const comment = require('../controllers/comment')
const auth  = require('../controllers/auth')
const notification = require('../controllers/notification')

router
    // auth相关
    .get('/auth', auth.verifyToken, auth.authUser)
    .post('/auth/signup', auth.signup)
    .post('/auth/signin', auth.signin)

    // user相关
    .get('/users/:id', user.fetchOne)
    .patch('/users/:id', auth.verifyToken, user.updateOne)
    .post('/users/:id/follow', auth.verifyToken, user.follow)
    .delete('/users/:id/follow', auth.verifyToken, user.unfollow)
    // .get('/users/:id/comments', auth.verifyToken, user.fetchComments )

    // article相关
    .get('/articles', article.fetchAll)
    .get('/articles/:id', auth.optionalVerify, article.fetchOne)
    .post('/articles', auth.verifyToken, article.post)
    .patch('/articles/:id', auth.verifyToken, article.update)
    .delete('/articles/:id', auth.verifyToken, article.deleteOne)
    .post('/articles/:id/like', auth.verifyToken, article.toggleLike)

    // comment相关
    .get('/comments', comment.fetch)
    .post('/comments', auth.verifyToken, comment.post)
    .delete('/comments/:id', auth.verifyToken, comment.delete)

    // 通知相关
    .get('/notifications/', auth.verifyToken, notification.fetch)

    // .get('/tags')

module.exports = router