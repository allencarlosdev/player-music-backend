const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utilities/handleError')

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
const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await tracksModel.findById(id)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEM')
  }
}
// create an item
const createItem = async (req, res) => {
  try {
    const body = matchedData(req)
    const data = await tracksModel.create(body)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_ITEMS')
  }
}
// update an item
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const data = await tracksModel.findOneAndUpdate({
      id,
      body
    })
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_UPDATE_ITEMS')
  }
}
// delete an item
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await tracksModel.deleteOne({ _id: id })
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_ITEM')
  }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
