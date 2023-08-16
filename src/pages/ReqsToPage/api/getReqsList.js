import axios from 'axios';

export default async function getReqsList(url, params) {
  const response = await axios.get(url, { params });
  return JSON.parse(response.data.req_data);
}
