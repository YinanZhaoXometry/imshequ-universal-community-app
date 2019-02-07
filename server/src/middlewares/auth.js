const jwtSecret = require('../config').jwtSecret
const jwt = require('jsonwebtoken')


module.exports = {
  authUser (req, res, next) {
    if (!req.user) {
      res.status(403).send('请先登录')
    } else {
      res.json({user: {
        id: req.user.id, 
        username: req.user.username
      } })
    }
  },

  verifyToken (req, res, next) {
    let str = req.headers.authorization
    if (str.startsWith('Bearer') || str.startsWith('Token')) {
      var token = str.split(' ')[1]
    }
    if (!token) {
      res.status(403).send('JWT token 未提供')
    } else {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          res.status(403).send('请先登录')
        } else {
          req.user = decoded
          next()
        }
      })
    }
  },

  createToken (payload) {
    return jwt.sign(
      payload, 
      jwtSecret,
      { expiresIn: '7d' }
    )
  }
  
}