const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = path.join(__dirname, '/../storage')
    cb(null, pathStorage)
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const fileName = `file-${Date.now()}.${ext}`
    cb(null, fileName)
  }
})

const updateMiddleware = multer({ storage })

module.exports = updateMiddleware
