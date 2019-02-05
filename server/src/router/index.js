const router = require('express').Router()


router
    .get('/user')
    .put('/user')
    .post('/users/login')
    .post('/users')

    .get('/articles')
    .get('/articles/feed')
    .post('/articles')
    .get('/articles/:article')
    .put('/articles/:article')
    .delete('/articles/:article')
    .post('/articles/:article/favorite')
    .delete('/articles/:article/favorite')
    .get('/articles/:article/comments')
    .post('/articles/:article/comments')
    .delete('/articles/:article/comments/:comment')

    .get('/profiles/:username')
    .post('/profiles/:username/follow')
    .delete('/profiles/:username/follow')

    .get('/tags')