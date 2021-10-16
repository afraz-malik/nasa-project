const {
  getLaunches,
  addLaunch,
  abortLaunch,
} = require('../models/launches.model')

async function httpGetLauches(req, res) {
  res.json(await getLaunches())
}
function httpPostLaunches(req, res) {
  const launch = req.body
  launch.launchDate = new Date(launch.launchDate)
  res.status(201).json(addLaunch(req.body))
}
function httpAbortLaunches(req, res) {
  console.log(req.params.id)
  const launch = abortLaunch(Number(req.params.id))
  res.status(200).json(launch)
}
module.exports = { httpGetLauches, httpPostLaunches, httpAbortLaunches }
