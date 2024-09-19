const httpStatus = require('http-status-codes').StatusCodes
const { Op } = require('sequelize')
const { resource } = require('../../../../database/connection')

module.exports.manageData = async (options) => {
  const currentPage = options.page ? Number(options.page) : 1
  const limit = options.limit ? Number(options.limit) : 10
  const offset = (currentPage - 1) * limit

  let searchQuery = {}
  if (options.searchText || '') {
    const search = options.searchText.trim().replace(/\s+/g, ' ')

    searchQuery = {
      [Op.or]: [
        { title: { [Op.like]: '%' + search + '%' } },
        { description: { [Op.like]: '%' + search + '%' } },
      ],
    }
  }

  const { count, rows: resourceData } = await resource.findAndCountAll({
    where: [{ isActive: 1 }, searchQuery],
    limit: limit,
    offset: offset,
    order: [['id', 'ASC']],
  })

  if (resourceData.length > 0) {
    return {
      isSuccess: true,
      message: 'Success',
      code: httpStatus.OK,
      data: {
        currentPage: currentPage,
        pageLimit: limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        resource: resourceData,
      },
    }
  }
  return {
    isSuccess: false,
    message: 'Data not found',
    code: httpStatus.OK,
    data: {
      currentPage: currentPage,
      pageLimit: limit,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      resource: resourceData,
    },
  }
}
