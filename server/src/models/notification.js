const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const notificationSchema = new mongoose.Schema({
  type: { type:String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  htmlContent: { type: String, required: true },
  toWhom: { type: ObjectId, ref: 'User' },
  fromWhom: { type: ObjectId, ref: 'User' },
  article: { type: ObjectId, ref: 'Article' },

})

const Notification = mongoose.model('Notification', notificationSchema)
module.exports = Notification