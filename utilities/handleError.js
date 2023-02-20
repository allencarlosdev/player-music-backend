const handleHttpError = (res, message = 'Something Happened', code = 403) => {
  res.status(code)
  res.status({ error: message })
}

module.exports = { handleHttpError }
