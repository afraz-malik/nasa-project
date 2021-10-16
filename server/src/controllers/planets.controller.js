const { getPlanets } = require('../models/planets.model')
async function httpGetPlanets(req, res) {
  res.status(200).json(await getPlanets())
}
module.exports = {
  httpGetPlanets,
}
