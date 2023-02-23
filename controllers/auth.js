const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utilities/handlePassword')
const { usersModel } = require('../models')
const { tokenSign } = require('../utilities/handleJwt')
const { handleHttpError } = require('../utilities/handleError')

const registerController = async (req, res) => {
  try {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = { ...req, password }
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, { strict: false })

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser
    }

    res.send({ data })
  } catch (error) {
    return handleHttpError(res, 'ERROR_REGISTER_USER')
  }
}

const loginController = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await usersModel
      .findOne({ email: req.email })
      .select('password name role email')

    if (!user) {
      return handleHttpError(res, 'USER_NOT_EXISTS', 404)
    }

    const hashPassword = user.get('password')
    const check = await compare(req.password, hashPassword)

    if (!check) {
      return handleHttpError(res, 'PASSWORD_INVALID', 401)
    }

    user.set('password', undefined, { strict: false })
    const data = {
      token: await tokenSign(user),
      user
    }

    res.send({ data })
  } catch (error) {
    return handleHttpError(res, 'ERROR_LOGIN_USER')
  }
}

module.exports = { registerController, loginController }
