const express = require('express')
const { httpGetPlanets } = require('../controllers/planets.controller.js')
const planetsRouter = express.Router()

planetsRouter.get('/', httpGetPlanets)
module.exports = planetsRouter
