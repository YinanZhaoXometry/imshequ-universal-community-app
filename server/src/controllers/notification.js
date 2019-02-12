const Nofitication = require('../models/notification')

async function fetchUnread (req, res, next) {
  let userId = req.user.id
  let notification = await Nofitication.find({ type, toWhom: userId, isRead: false })
}

async function fetch (req, res, next) {
  let { offset, limit, type } = req.query
  let userId = req.user.id
  let options = { skip: parseInt(offset), limit: parseInt(limit) }
  let docs = await Nofitication.find({ type, toWhom: userId }, {}, options)
  for (doc of docs) {
    if(doc.isRead === false) {
      doc.set({isRead: true})
      doc = doc.save()
    }
  }
  res.json({notifications: docs})
}

module.exports  = { fetch }