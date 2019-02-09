const jwtSecret = require('../config').jwtSecret
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const auth = require('./auth')
const emailRegExp = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/

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
  },
  async signup (req, res, next) {
    try {
      let errors = []
      let { username, email, password } = req.body
      email = email.toLowerCase().trim()
      username = username.trim()
      password = password.trim()
      if (!email) {
        errors.push('邮箱不能为空') 
      } else {
        if (!emailRegExp.test(email)) 
          errors.push('邮箱不合法')
      }
      if (!username) 
        errors.push('用户名不能为空')
      if (!password) {
        errors.push('密码不能为空')
      } else {
        if (password.length < 6) 
          errors.push('密码不能少于6位')
      }
      let resultUsername = await User.findOne({username})
      let resultEmail = await User.findOne({email})
      if (resultUsername) 
        errors.push('用户名已存在')
      if (resultEmail) 
        errors.push('邮箱已存在')
      if (errors.length !== 0) {
        res.status(422).json({errors})
      } else {
        let passwordHash = await bcrypt.hash(password, 10)
        let userDoc = await User.create({
          username,
          password: passwordHash,
          email
        })
        let jwtPayload = {
          id: userDoc._id,
          username: userDoc.username
        }
        let token = auth.createToken(jwtPayload)
        res.json({user: { username, email, token }})
      }
    } catch (err) {
      next(err)
    }
  },
  async signin (req, res, next) {
    let { email, password } = req.body
    let errors = []
    email = email.toLowerCase().trim()
    password = password.trim()
    if (!email) 
      errors.push('邮箱不能为空') 
    if (!password) 
      errors.push('密码不能为空')
    let userDoc = await User.findOne({email}, null)
    if (!userDoc) {
      errors.push('邮箱未注册')
    } else {
      let isPwdValid = await bcrypt.compare(password, userDoc.password)
      if (!isPwdValid) errors.push('密码不正确')
    }
    if (errors.length !== 0) {
      res.status(422).json({errors})
    } else {
      let jwtPayload = {
        id: userDoc._id,
        username: userDoc.username
      }
      let token = auth.createToken(jwtPayload)
      res.json({user:{username: userDoc.username, email, token}})
    }
  },
  
}