const express = require('express')
const updateMiddleware = require('../utilities/handleStorage')
const { createItem } = require('../controllers/storage')
const router = express.Router()

router.post('/', updateMiddleware.single('myFile'), createItem)

module.exports = router
