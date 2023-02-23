const { check } = require('express-validator')
const validateResults = require('../utilities/handleValidator')

const validatorRegister = [
  check('name').exists().notEmpty().isLength({ min: 3, max: 50 }),
  check('age').exists().notEmpty().isNumeric({ min: 12, max: 200 }),
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  check('email').exists().notEmpty().isEmail().isLength({ min: 8, max: 75 }),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorLogin = [
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  check('email').exists().notEmpty().isEmail().isLength({ min: 8, max: 75 }),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]
module.exports = { validatorRegister, validatorLogin }
