const jwt = require('jsonwebtoken')
const httpStatus = require('http-status-codes').StatusCodes

module.exports.verifyTokenAuthentication = function () {
  return function (req, res, next) {
    const token = req.headers['authentication']
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        isSuccess: false,
        message: 'Token provided not found',
        code: httpStatus.UNAUTHORIZED,
        data: {},
      })
    }
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        if (err.toString() === 'TokenExpiredError: jwt expired') {
          return res.status(httpStatus.UNAUTHORIZED).send({
            isSuccess: false,
            message: 'Please login',
            code: httpStatus.UNAUTHORIZED,
            data: {},
          })
        }
        if (err.toString() === 'JsonWebTokenError: invalid signature') {
          return res.status(httpStatus.UNAUTHORIZED).send({
            isSuccess: false,
            message: 'Invalid Token',
            code: httpStatus.UNAUTHORIZED,
            data: {},
          })
        }
        return res.status(httpStatus.UNAUTHORIZED).send({
          isSuccess: false,
          message: 'Invalid Token',
          code: httpStatus.UNAUTHORIZED,
          data: {},
        })
      }
      delete decoded.iat
      delete decoded.exp
      req.token_parse = decoded
      return next()
    })
  }
}
