const jwtSecret = require('../config').jwtSecret
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const emailRegExp = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/


const authUser = function (req, res, next) {
  if (!req.user) {
    res.status(403).send('请先登录')
  } else {
    res.json({user: {
      id: req.user.id, 
      username: req.user.username
    } })
  }
}

const verifyToken = function (req, res, next) {
  var str = req.headers.authorization ? req.headers.authorization : ''
  var token = ( str.startsWith('Bearer') || str.startsWith('Token') )
    ? str.split(' ')[1] : null
  if (!token) {
    res.status(403).send('JWT token 未提供')
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(403).send('JWT 验证失败')
      } else {
        req.user = decoded
        next()
      }
    })
  }
}

const optionalVerify = function (req, res, next) {
  var str = req.headers.authorization ? req.headers.authorization : ''
  var token = ( str.startsWith('Bearer') || str.startsWith('Token') )
    ? str.split(' ')[1] : null
  if (!token) {
    next()
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(403).send('JWT 验证失败')
      } else {
        req.user = decoded
        next()
      }
    })
  }
}

const createToken = function (payload) {
  return jwt.sign(
    payload, 
    jwtSecret,
    { expiresIn: '7d' }
  )
}

const signup = async function (req, res, next) {
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
      let token = createToken(jwtPayload)
      res.json({user: { username, email, token }})
    }
  } catch (err) {
    next(err)
  }
}

const signin = async function (req, res, next) {
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
    let token = createToken(jwtPayload)
    res.json({user:{username: userDoc.username, email, token}})
  }
}

module.exports = { authUser, verifyToken, createToken, signup, signin, optionalVerify }
