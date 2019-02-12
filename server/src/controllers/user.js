const User = require('../models/user')
const auth = require('./auth')

module.exports = {
  async fetchOne (req, res, next) {
    let _id = req.params.id
    let result = await User.findOne({_id}, '-password -following')
    res.json({profile: result})
  },

  async updateOne (req, res, next) {
    let profile = req.body
    let _id = req.params.id
    let doc = await User.findOne({_id})
    doc = await doc.set(profile).save()
    let jwtPayload = {
      id: doc._id,
      username: doc.username
    }
    let token = auth.createToken(jwtPayload)
    res.json({ username: doc.username, id: doc._id, token })
  },

  async follow (req, res, next) {
    let targetUserId = req.params.id
    let followerId = req.body.authUserId
    // 把被订阅者（targetUser）加入订阅者（follower）的following名单里
    let follower = await User.findOne({_id: followerId})
    if (follower.following.indexOf(targetUserId) !== -1) {
      return res.sendStatus(400)
    } else {
      follower.following.push(targetUserId)
      await follower.save()
    }
    // 把订阅者加入被订阅者的followers名单里
    let user = await User.findOne({_id: targetUserId})
    if (user.followers.indexOf(followerId) !== -1) {
      return res.sendStatus(400)
    } else {
      user.followers.push(followerId)
      user = await user.save()
      res.json({profile: user})
    }
  },

  async unfollow (req, res, next) {
    let targetUserId = req.params.id
    let followerId = req.query.authUserId
    // 把被订阅者（targetUser）从订阅者（follower）的following名单里删除
    let follower = await User.findOne({_id: followerId})
    let index = follower.following.indexOf(targetUserId)
    if (index === -1) {
      return res.sendStatus(400)
    } else {
      follower.following.splice(index, 1)
      await follower.save()
    }
    // 把订阅者从被订阅者的followers名单里删除
    let user = await User.findOne({_id: targetUserId})
    let key = user.followers.indexOf(followerId)
    if (key === -1) {
      return res.sendStatus(400)
    } else {
      user.followers.splice(key, 1)
      user = await user.save()
      res.json({profile: user})
    }
  },

  async fetchComments (req, res, next) {
    
  }
}