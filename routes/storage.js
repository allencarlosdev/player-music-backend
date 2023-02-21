const express = require('express')
const uploadMiddleware = require('../utilities/handleStorage')
const { validatorGetItem } = require('../validators/storage')
const {
  getItem,
  getItems,
  deleteItem,
  createItem
} = require('../controllers/storage')
const router = express.Router()

router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.delete('/:id', validatorGetItem, deleteItem)

router.post('/', uploadMiddleware.single('myFile'), createItem)

module.exports = router
