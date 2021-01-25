const axios = require('axios').default;

const { BLING_URL, BLING_KEY } = process.env;

const bling = axios.create({
  baseURL: BLING_URL,
  params: { apikey: BLING_KEY },
});

module.exports = bling;
