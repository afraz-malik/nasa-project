const http = require('http')
const app = require('./app.js')
const { loadLaunches } = require('./models/launches.model.js')
const { loadPlanet } = require('./models/planets.model.js')
const { mongoConnect } = require('./services/mongo.js')
require('dotenv').config()
const server = http.createServer(app)
const PORT = process.env.PORT || 8000

async function startServer() {
  await mongoConnect()
  await loadPlanet()
  await loadLaunches()
  server.listen(PORT, () => console.log(`App is working on PORT ${PORT} `))
}
startServer()
