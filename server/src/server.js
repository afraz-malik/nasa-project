const http = require('http')
const app = require('./app.js')
const mongoose = require('mongoose')
const { loadPlanet } = require('./models/planets.model.js')

const server = http.createServer(app)
const PORT = 5000
const MONGO_URL =
  'mongodb+srv://root:toor@tltm.ozxq4.mongodb.net/tltm?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
  console.log('Mongoose connection ready')
})
mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPlanet()
  server.listen(PORT, () => console.log('App is working on PORT 5000'))
}
// Routers

startServer()
