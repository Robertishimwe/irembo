import axios from 'axios';

const headers = {
  'content-type': 'multipart/form-data'
};
if (localStorage.token) {
  headers.token = `${localStorage.token}`;
}
export default axios.create({
  baseURL: 'https://irembobackend-production.up.railway.app/api',
  headers,
});