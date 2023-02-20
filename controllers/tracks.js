const { tracksModel } = require('../models')

// get list from database
const getItems = async (req, res) => {
  try {
    const data = await tracksModel.find({})
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}
// get an item
const getItem = (req, res) => {}
// create an item
const createItem = async (req, res) => {
  try {
    const { body } = req
    const data = await tracksModel.create(body)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_ITEMS')
  }
}
// update an item
const updateItem = (req, res) => {}
// delete an item
const deleteItem = (req, res) => {}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
