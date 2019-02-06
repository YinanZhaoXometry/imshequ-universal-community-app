const router = require('express').Router()
const user = require('../controllers/user')

const auth  = require('../middlewares/auth')


router
    // sign相关
    .post('/users/signup', user.signup)
    .post('/users/signin', user.signin)

    .get('/users/auth', auth.authUser)
    // .get('/user')
    // .put('/user')

    // .get('/articles')
    // .get('/articles/feed')
    // .post('/articles')
    // .get('/articles/:article')
    // .put('/articles/:article')
    // .delete('/articles/:article')
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