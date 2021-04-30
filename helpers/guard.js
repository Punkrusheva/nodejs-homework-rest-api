const passport = require('passport')
const { HttpCode } = require('./constants')
require('../config/passport')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
       let token = null
    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1]
       }
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Access is denied',
          })
    }
      req.user = user
      // req.local.user = user
       return next()
  })(req, res, next)
}

module.exports = guard