import axios from 'axios';

const headers = {
  'content-type': 'multipart/form-data'
};
if (localStorage.token) {
  headers.token = `${localStorage.token}`;
}
export default axios.create({
  baseURL: 'https://irembo.cyclic.app/api',
  headers,
});
