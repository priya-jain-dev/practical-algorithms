const axios = require("axios");
const BASE_URL = "http://localhost:5000/unstable-endpoint";

const makeRequest = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.log(`Request failed: ${error.message}`);
    return null;
  }
};

const cancel = () => {
  console.log("Request canceled.");
  return null;
};

const immediateRetry = async () => {
  return await makeRequest();
};

const fixedIntervals = async (interval, maxRetries) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await makeRequest();
    if (result) {
      return result;
    }
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
  }
  return null;
};

const incrementalIntervals = async (initialInterval, increment, maxRetries) => {
  let interval = initialInterval;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await makeRequest();
    if (result) {
      return result;
    }
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
    interval += increment;
  }
  return null;
};

const exponentialBackoff = async (initialInterval, maxRetries) => {
  let interval = initialInterval;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await makeRequest();
    if (result) {
      return result;
    }
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
    interval *= 2;
  }
  return null;
};

const exponentialBackoffWithJitter = async (initialInterval, maxRetries) => {
  let interval = initialInterval;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await makeRequest();
    if (result) {
      return result;
    }
    const jitter = Math.random() * initialInterval;
    await new Promise((resolve) =>
      setTimeout(resolve, (interval + jitter) * 1000)
    );
    interval *= 2;
  }
  return null;
};

module.exports = {
  cancel,
  immediateRetry,
  fixedIntervals,
  incrementalIntervals,
  exponentialBackoff,
  exponentialBackoffWithJitter,
};
