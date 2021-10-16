const request = require('supertest')
const app = require('../app')

describe('Test Get /launches', () => {
  test('It should response with 202 status', async () => {
    const response = await request(app).get('/launches').expect(200)
  })
})
describe('Test Post /launches', () => {
  test('It should be respond with 200', async () => {
    const response = await request(app)
      .post('/launches')
      .send({
        flightNumber: 100,
        mission: 'Fucking Mission',
        rocket: 'Explorer IS1',
        launchDate: new Date('December 02,  1992'),
        target: 'Kepler-442 b',
      })
      .expect(201)
  })
})
