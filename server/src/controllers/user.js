import user from '../models/user'

export default {
  getUser (req, res, next) {
    user.findById(req.payload.id)
      .then((user) => {
        if(!user) return res.sendStatus(401)
        return res.json({user: user.toAuthJSON()})
      })    
  }
}