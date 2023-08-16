import axios from 'axios';

export default async function getData(url, params) {
  const response = await axios.get(url, { params });
  return response.data;
}
