const { storageModel } = require('../models')
const PUBLIC_URL = process.env.PUBLIC_URL

// get list from database
const getItems = async (req, res) => {
  const data = await storageModel.find({})
  res.send({ data })
}
// get an item
const getItem = (req, res) => {}
// create an item
const createItem = async (req, res) => {
  const { file } = req
  const fileData = {
    fileName: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`
  }
  const data = await storageModel.create(fileData)
  res.send({ data })
}
// update an item
const updateItem = (req, res) => {}
// delete an item
const deleteItem = (req, res) => {}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
