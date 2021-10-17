const express = require('express')
const { httpGetPlanets } = require('../../controllers/planets.controller.js')

//Routes
const planetsRouter = express.Router()
planetsRouter.get('/', httpGetPlanets)

module.exports = planetsRouter
