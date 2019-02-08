const router = require('express').Router()
const user = require('../controllers/user')
const article = require('../controllers/article')
const comment = require('../controllers/comment')
const auth  = require('../middlewares/auth')


router
    // sign相关
    .get('/auth', auth.verifyToken, auth.authUser)
    .post('/auth/signup', user.signup)
    .post('/auth/signin', user.signin)

    // user相关
    .get('/users/:id', user.fetchOne)
    .patch('/users/:id', auth.verifyToken, user.updateOne)

    // article相关
    .get('/articles', article.fetchAll)
    .get('/articles/:id', article.fetchOne)
    .post('/articles', auth.verifyToken, article.post)
    .patch('/articles/:id', auth.verifyToken, article.update)
    .delete('/articles/:id', auth.verifyToken, article.delete )

    // comment相关
    .get('/comments', comment.fetch)
    .post('/comments', auth.verifyToken, comment.post)
    .delete('/comments/:id', auth.verifyToken, comment.delete)

    // .get('/articles/feed')
    // .get('/articles/:article')
    // .put('/articles/:article')
    // .post('/articles/:article/favorite')
    // .delete('/articles/:article/favorite')
    // .get('/articles/:article/comments')
    // .post('/articles/:article/comments')
    // .delete('/articles/:article/comments/:comment')

    // .get('/profiles/:username')
    // .post('/profiles/:username/follow')
    // .delete('/profiles/:username/follow')

    // .get('/tags')

module.exports = router