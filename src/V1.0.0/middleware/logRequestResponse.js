const logger = require('../../../logger')

const logRequestResponseMiddleware = (req, res, next) => {
  const method = req.method
  const url = req.originalUrl
  const requestBody = JSON.stringify(req.body)

  logger.info(`${method} ${url} [Request Body]: ${requestBody}`)

  const originalSend = res.send

  res.send = function (body) {
    const isAlreadyStringified = typeof body === 'string'

    const responseBody = isAlreadyStringified ? body : JSON.stringify(body)

    logger.info(`${method} ${url} [Response Body]: ${responseBody}`)

    return originalSend.call(this, body)
  }

  next()
}

module.exports = logRequestResponseMiddleware
