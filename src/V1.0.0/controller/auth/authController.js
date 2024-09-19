const logger = require('../../../../logger')
const logInService = require('../../services/auth/logInService')
const httpStatus = require('http-status-codes').StatusCodes

module.exports.logIn = async (options) => {
  try {
    return await logInService.manageData(options)
  } catch (error) {
    logger.error(error)
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong',
      additionalInfo: error,
    }
  }
}
