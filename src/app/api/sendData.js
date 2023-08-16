import axios from 'axios';

export default async function sendData(url, data, method) {
  return axios(
    { method, url, data: { data } },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
