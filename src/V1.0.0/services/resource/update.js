const httpStatus = require('http-status-codes').StatusCodes
const { resource } = require('../../../../database/connection')

module.exports.manageData = async (options) => {
  const checkActive = await resource.findOne({ where: { id: options.id } })
  if (checkActive && checkActive.dataValues.isActive === 1) {
    const checkResource = await checkResourceExist(options)
    if (checkResource === true) {
      return {
        isSuccess: false,
        message: 'Resource already exists',
        code: httpStatus.BAD_REQUEST,
        data: {},
      }
    }
    const resourceCreate = await resource.update(createObject(options), {
      where: { id: options.id },
    })
    if (resourceCreate[0] === 1) {
      return {
        isSuccess: true,
        message: 'Resource updated successfully',
        code: httpStatus.OK,
        data: {},
      }
    }
    return {
      isSuccess: false,
      message: 'Resource updating failed',
      code: httpStatus.BAD_REQUEST,
      data: {},
    }
  } else {
    return {
      isSuccess: false,
      message: 'This record is not found',
      code: httpStatus.BAD_REQUEST,
      data: {},
    }
  }
}

const createObject = (options) => {
  return {
    title: options.title,
    description: options.description,
  }
}

const checkResourceExist = async (options) => {
  const resourceExist = await resource.findAll({
    where: { title: options.title, isActive: 1 },
  })
  if (
    resourceExist.length > 0 &&
    resourceExist[0].id !== parseInt(options.id)
  ) {
    return true
  }
  return false
}
