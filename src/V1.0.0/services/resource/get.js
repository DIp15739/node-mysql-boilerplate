const httpStatus = require('http-status-codes').StatusCodes
const { resource } = require('../../../../database/connection')

module.exports.manageData = async (options) => {
  const resourceData = await resource.findAll({
    where: { id: options, isActive: 1 },
  })

  if (resourceData.length > 0) {
    return {
      isSuccess: true,
      message: 'Success',
      code: httpStatus.OK,
      data: { resource: resourceData },
    }
  }
  return {
    isSuccess: false,
    message: 'Invalid id',
    code: httpStatus.BAD_REQUEST,
    data: {},
  }
}
