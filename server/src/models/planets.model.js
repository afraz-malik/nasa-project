const planets = require('./planets.mongo')
const parse = require('csv-parse')
const fs = require('fs')
const path = require('path')

const Habitableplanets = []
function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  )
}
function loadPlanet() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          // planets.push(data)
          savePlanet(data)
        }
      })
      .on('error', (err) => {
        reject(err)
      })
      .on('end', async () => {
        console.log((await getPlanets()).length, 'Planets found you asshole')
        resolve()
      })
  })
}
async function savePlanet(planet) {
  try {
    await planets.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true }
    )
  } catch (error) {
    console.error('We could not store data in mongo ', error.message)
  }
}
async function getPlanets() {
  return await planets.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  )
}
module.exports = {
  getPlanets,
  loadPlanet,
}
