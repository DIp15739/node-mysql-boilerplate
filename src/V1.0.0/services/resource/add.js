const { resource } = require('../../../../database/connection')

const httpStatus = require('http-status-codes').StatusCodes

module.exports.manageData = async (options) => {
  const checkResource = await checkResourceExist(options)
  if (checkResource === true) {
    return {
      isSuccess: false,
      message: 'Resource already exists',
      code: httpStatus.BAD_REQUEST,
      data: {},
    }
  }
  const resourceCreate = await resource.create(createObject(options))
  if (resourceCreate) {
    const result = resourceCreate
    return {
      isSuccess: true,
      message: 'Resource created successfully',
      code: httpStatus.OK,
      data: { result },
    }
  }
  return {
    isSuccess: false,
    message: 'Resource creation failed',
    code: httpStatus.BAD_REQUEST,
    data: {},
  }
}

const createObject = (options) => {
  return {
    title: options.title,
    description: options.description,
  }
}

const checkResourceExist = async (options) => {
  const checkResource = await resource.findOne({
    where: { title: options.title, isActive: 1 },
  })
  if (checkResource) {
    return true
  }
  return false
}
