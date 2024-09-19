const { resource } = require('../../../../database/connection')

const httpStatus = require('http-status-codes').StatusCodes

module.exports.manageData = async (options) => {
  const checkResource = await resource.findOne({ where: { id: options } })
  if (checkResource) {
    const resourceDelete = await resource.update(
      { isActive: 0 },
      { where: { id: options } }
    )

    if (resourceDelete[0] === 0) {
      return {
        isSuccess: false,
        message: 'Delete failed',
        code: httpStatus.BAD_REQUEST,
        data: {},
      }
    }

    return {
      isSuccess: true,
      message: 'Delete successfully',
      code: httpStatus.OK,
      data: {},
    }
  }
  return {
    isSuccess: false,
    message: 'This record is not found',
    code: httpStatus.BAD_REQUEST,
    data: {},
  }
}
