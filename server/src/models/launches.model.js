const launches = require('./launches.mongo')
const planets = require('./planets.mongo')
const axios = require('axios')
let INITIAL_FLIGHT_NUMBER = 10
let launchesApiUrl = 'https://api.spacexdata.com/v4/launches/query'
// const launches = new Map()
// const launch = {
//   flightNumber: 100,
//   mission: 'Fucking Mission',
//   rocket: 'Explorer IS1',
//   launchDate: new Date('December 02,  1992'),
//   target: 'Kepler-1410 b',
//   customer: ['Malik ak ', 'Nahal'],
//   upcomming: true,
//   success: true,
// }
// saveLaunch(launch)
async function loadLaunches(params) {
  console.log('Downloading Launches Data')
  const resp = await axios.post(launchesApiUrl, {
    query: {},
    options: {
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  })
  const launchDocs = resp.data.docs
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads']
    const customers = payloads.flatMap((payload) => payload['customers'])
    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcomming: launchDoc['upcomming'],
      succes: launchDoc['success'],
      customers,
    }
    console.log(launch)
  }
}
async function getlatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort('-flightNumber')
  if (!latestLaunch) {
    return INITIAL_FLIGHT_NUMBER
  } else {
    return latestLaunch.flightNumber
  }
}
async function getLaunches() {
  // return Array.from(launches.values())
  return await launches.find(
    {}
    // {
    //   __v: 0,
    //   _id: 0,
    // }
  )
}
async function addLaunch(data) {
  const flightNumber = await getlatestFlightNumber()
  const newLaunch = Object.assign(data, {
    flightNumber: flightNumber + 1,
    customer: ['Malik ak ', 'Nahal'],
    upcomming: true,
    success: true,
  })
  return await saveLaunch(newLaunch)
}
async function abortLaunch(id) {
  return await launches.updateOne(
    {
      flightNumber: id,
    },
    {
      upcomming: false,
      success: false,
    }
  )
}
async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  })
  if (!planet) {
    return { error: 'You fukcing bitch > sending me wrong planet' }
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
module.exports = { getLaunches, addLaunch, abortLaunch, loadLaunches }
