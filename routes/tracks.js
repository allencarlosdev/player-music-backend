const express = require('express')
const authMiddleware = require('../middleware/session')
const checkRole = require('../middleware/role')
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
router.get('/:id', authMiddleware, validatorGetItem, getItem)
router.post(
  '/',
  authMiddleware,
  checkRole(['admin']),
  validatorCreateItem,
  createItem
)
router.put(
  '/:id',
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
)
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem)

module.exports = router
