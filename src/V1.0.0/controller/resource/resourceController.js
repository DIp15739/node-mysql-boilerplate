const httpStatus = require('http-status-codes').StatusCodes
const logger = require('../../../../logger')
const {
  addResource,
  listResource,
  getResource,
  deleteResource,
  updateResource,
} = require('../../services/resource')

module.exports.resourceAdd = async (options) => {
  try {
    return await addResource.manageData(options)
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'something went wrong',
      additionalInfo: error,
    }
  }
}

module.exports.resourcesList = async (options) => {
  try {
    return await listResource.manageData(options)
  } catch (error) {
    logger.error(error)
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'something went wrong',
      additionalInfo: error,
    }
  }
}

module.exports.resourceGet = async (options) => {
  try {
    return await getResource.manageData(options)
  } catch (error) {
    logger.error(error)
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'something went wrong',
      additionalInfo: error,
    }
  }
}

module.exports.resourceDelete = async (options) => {
  try {
    return await deleteResource.manageData(options)
  } catch (error) {
    logger.error(error)
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'something went wrong',
      additionalInfo: error,
    }
  }
}

module.exports.resourceUpdate = async (options) => {
  try {
    return await updateResource.manageData(options)
  } catch (error) {
    logger.error(error)
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'something went wrong',
      additionalInfo: error,
    }
  }
}
