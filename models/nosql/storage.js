const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const storageScheme = new mongoose.Schema(
  {
    url: {
      type: String
    },
    fileName: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

storageScheme.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('storages', storageScheme)
