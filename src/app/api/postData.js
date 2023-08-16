import axios from 'axios';

export default function postData(url, reqData) {
  return axios.post(url, reqData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
