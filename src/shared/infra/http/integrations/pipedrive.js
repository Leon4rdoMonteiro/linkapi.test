const axios = require('axios').default;

const { PIPEDRIVE_URL, PIPEDRIVE_TOKEN, PIPEDRIVE_USER } = process.env;

const pipedrive = axios.create({
  baseURL: PIPEDRIVE_URL,
  params: { api_token: PIPEDRIVE_TOKEN, user_id: PIPEDRIVE_USER },
});

module.exports = pipedrive;
