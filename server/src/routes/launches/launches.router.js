const express = require('express')
const {
  httpGetLauches,
  httpPostLaunches,
  httpAbortLaunches,
} = require('../../controllers/launches.controller')

//Routes
const launchesRouter = express.Router()
launchesRouter.get('/', httpGetLauches)
launchesRouter.post('/', httpPostLaunches)
launchesRouter.delete('/:id', httpAbortLaunches)

module.exports = launchesRouter
