const { storageModel } = require('../models')
const path = require('path')
const fs = require('fs') // this is require if i need an complete delete
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utilities/handleError')
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = path.join(__dirname, '/../storage')

// get list from database
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({})
    res.send({ data })
  } catch (error) {
    return handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}
// get an item
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await storageModel.findById(id)
    res.send({ data })
  } catch (error) {
    return handleHttpError(res, 'ERROR_GET_ITEM')
  }
}
// create an item
const createItem = async (req, res) => {
  try {
    const { file } = req
    const fileData = {
      fileName: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({ data })
  } catch (error) {
    return handleHttpError(res, 'ERROR_CREATE_ITEM')
  }
}

// delete an item
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const dataFile = await storageModel.findById(id)
    // with soft delete
    // await storageModel.delete({ _id: id })

    // with complete delete
    await storageModel.deleteOne({ _id: id })
    const { fileName } = dataFile
    const filePath = `${MEDIA_PATH}/${fileName}`
    // fs.unlinkSync(filePath) Delete complete - not soft delete
    fs.unlinkSync(filePath)
    const data = {
      filePath,
      deleted: 1
    }
    res.send({ data })
  } catch (error) {
    return handleHttpError(res, 'ERROR_DELETE_ITEM')
  }
}

module.exports = { getItems, getItem, createItem, deleteItem }
