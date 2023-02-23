const express = require('express')
const authMiddleware = require('../middleware/session')
const router = express.Router()
const {
  validatorCreateItem,
  validatorGetItem
} = require('../validators/tracks')
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/tracks')

router.get('/', authMiddleware, getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', validatorCreateItem, createItem)
router.put('/:id', validatorGetItem, validatorCreateItem, updateItem)
router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router
