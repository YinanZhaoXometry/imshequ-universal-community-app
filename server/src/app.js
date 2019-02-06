const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = require('./router')
const config = require('./config')
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

app.use(cors())

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(config.apiPrefix, router)


mongoose.connect(config.dbURL, { useNewUrlParser: true })
  .then(console.log('连接数据库成功'))
  .catch(err => console.log('连接数据库失败：'+ err))

app.use(function (err, req, res, next) {
  const errorCode = err.status || 500
  console.log(err)
})

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + server.address().port)
})
