/* eslint-env es6 */
/* eslint-disable no-console */
const api_url = "v1/";

async function httpGetPlanets() {
  try {
    const response = await fetch(`${api_url}/planets`);
    return await response.json();
  } catch(e) {
    return {
      ok: false
    }
  }
}

async function httpGetLaunches() {
  const response = await fetch(`${api_url}/launches`);
  const fetchedLaunches = await response.json();
  return await fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${api_url}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  return await fetch(`${api_url}/launches/${id}`, {
    method: "delete",
  });
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
