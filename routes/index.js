const express = require('express')
const fs = require('fs')
const router = express.Router()

const PATH_ROUTES = __dirname

const removeExtension = (fileName) => {
  return fileName.split('.').shift()
}

const filterFile = (file) => {
  const name = removeExtension(file)
  if (name !== 'index') {
    return router.use(`/${name}`, require(`./${file}`))
  }
}
fs.readdirSync(PATH_ROUTES).filter(filterFile)

module.exports = router
