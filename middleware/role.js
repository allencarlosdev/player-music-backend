const handleHttpError = require('../utilities/handleError')

const checkRole = (role) => (req, res, next) => {
  try {
    const { user } = req
    const rolesByUser = user.roles
    const checkValueRole = role.some((roleSingle) =>
      rolesByUser.includes(roleSingle)
    )

    if (!checkValueRole) {
      return handleHttpError(req, 'USER_NOT_PERMISSIONS', 403)
    }
    next()
  } catch (error) {
    return handleHttpError(res, 'ERROR_PERMISSIONS', 403)
  }
}

module.exports = checkRole
