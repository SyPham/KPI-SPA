import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// axios.defaults.headers.post['Content-Type'] = 'application/octet-stream';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("authToken")}`;
export const HTTP = axios.create({
  // baseURL: 'https://localhost:44309/'
  baseURL: 'http://10.4.4.224:98/'
})


