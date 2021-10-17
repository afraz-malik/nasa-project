const {
  getLaunches,
  addLaunch,
  abortLaunch,
} = require('../models/launches.model')

async function httpGetLauches(req, res) {
  res.json(await getLaunches())
}
async function httpPostLaunches(req, res) {
  const launch = req.body
  launch.launchDate = new Date(launch.launchDate)
  res.status(201).json(await addLaunch(launch))
}
async function httpAbortLaunches(req, res) {
  const response = await abortLaunch(Number(req.params.id))
  if (response.matchedCount === 0) {
    res.status(400).json({ error: 'No launch found against this id' })
  } else if (response.modifiedCount === 0) {
    res.status(400).json({ error: 'Launched has already been aborted' })
  } else if (response.matchedCount === 1 && response.modifiedCount === 1) {
    res.status(201).json({ success: 'Launched has aborted' })
  }
}
module.exports = { httpGetLauches, httpPostLaunches, httpAbortLaunches }
