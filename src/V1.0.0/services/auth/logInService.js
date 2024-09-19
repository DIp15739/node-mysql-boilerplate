const httpStatus = require('http-status-codes').StatusCodes
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { user } = require('../../../../database/connection')

module.exports.manageData = async (options) => {
  try {
    const emailExist = await user.findOne({
      where: { email: options.email },
    })

    if (!emailExist) {
      return {
        isSuccess: false,
        code: httpStatus.UNAUTHORIZED,
        message: 'Invalid email',
        data: {},
      }
    }

    const isPasswordValid = await bcrypt.compare(
      options.password,
      emailExist.dataValues.password
    )

    if (!isPasswordValid) {
      return {
        isSuccess: false,
        code: httpStatus.UNAUTHORIZED,
        message: 'Invalid password',
        data: {},
      }
    }

    const token = jwt.sign(
      {
        id: emailExist.dataValues.id,
        email: emailExist.dataValues.email,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '24h',
      }
    )

    return {
      isSuccess: true,
      code: httpStatus.OK,
      message: 'Login successfully',
      data: { token },
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: 'Failed to login',
      code: httpStatus.BAD_REQUEST,
      data: { error },
    }
  }
}
