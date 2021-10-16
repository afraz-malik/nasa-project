const launches = require('./launches.mongo')
const planets = require('./planets.mongo')
// const launches = new Map()
const launch = {
  flightNumber: 100,
  mission: 'Fucking Mission',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 02,  1992'),
  target: 'Kepler-1410 b',
  customer: ['Malik ak ', 'Nahal'],
  upcomming: true,
  success: true,
}
let INITIAL_FLIGHT_NUMBER = 10

async function getLaunches() {
  // return Array.from(launches.values())
  return await launches.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  )
}
async function getlatestLaunch() {
  const latestLaunch = await launches.findOne().sort('-flightNumber')
  if (!latestLaunch) {
    return INITIAL_FLIGHT_NUMBER
  } else {
    return latestLaunch.flightNumber
  }
}
async function addLaunch(data) {
  const flightNumber = await getlatestLaunch()
  const newLaunch = Object.assign(data, {
    flightNumber: flightNumber + 1,
    customer: ['Malik ak ', 'Nahal'],
    upcomming: true,
    success: true,
  })
  console.log(newLaunch)
  return await saveLaunch(newLaunch)
}
// launches.set(launch.flightNumber, launch)
async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  })
  if (!planet) {
    throw new Error('You fukcing bitch > sending me wrong planet')
  } else {
    await launches.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      { upsert: true }
    )
    return launch
  }
}
async function abortLaunch(id) {
  const newLaunch = await launches.findOne({ flightNumber: id })
  newLaunch.upcomming = false
  newLaunch.success = false
  return await saveLaunch(newLaunch)
}
saveLaunch(launch)
module.exports = { getLaunches, addLaunch, abortLaunch }
