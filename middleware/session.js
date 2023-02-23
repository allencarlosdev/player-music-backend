const { verifyToken } = require('../utilities/handleJwt')
const { handleHttpError } = require('../utilities/handleError')
const { usersModel } = require('../models')

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return handleHttpError(res, 'NOT_TOKEN', 401)
    }

    const token = req.headers.authorization.split(' ').pop() // Bearer token
    const dataToken = await verifyToken(token)
    if (!dataToken._id) {
      return handleHttpError(res, 'ERROR_ID_TOKEN', 401)
    }
    const user = await usersModel.findById(dataToken._id)
    req.user = user
    next()
  } catch (error) {
    return handleHttpError(res, 'Not_SESSION', 401)
  }
}

module.exports = authMiddleware
