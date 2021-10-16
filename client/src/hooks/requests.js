const API_URL = 'http://localhost:5000'
async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const fetchedLaunches = await response.json()
  return fetchedLaunches
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  console.log(launch)
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  var raw = JSON.stringify(launch)
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }
  fetch('http://localhost:5000/launches', requestOptions)
    .then((response) => response.json())
    .then((result) => httpGetLaunches())
    .catch((error) => console.log('error', error))

  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  var raw = JSON.stringify()
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }
  fetch(`http://localhost:5000/launches/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
  httpGetLaunches()
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch }
