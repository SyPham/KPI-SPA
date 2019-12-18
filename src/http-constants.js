import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
export const HTTP = axios.create({
  baseURL: 'https://localhost:44309/'
})


