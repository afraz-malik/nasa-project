const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const api = require('./routes/api')
const app = express()

// MiddleWares
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use(express.json())
app.use(morgan('combined'))
// Api's
// app.use('/api/v1', api)
app.use(api)
// Serving Front End
app.use(express.static(path.join(__dirname, '..', 'public')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
