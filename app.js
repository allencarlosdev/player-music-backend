require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/mongo')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('storage'))

const PORT = process.env.PORT || 3000

// Routes

app.use('/api', require('./routes'))

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`)
})

dbConnect()
