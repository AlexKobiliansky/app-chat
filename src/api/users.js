import axios from '../core/axios';

export default {
  login: postData => axios.post(`/user/signin`, postData),
  register: postData => axios.post(`/user/signup`, postData),
  verifyHash: hash => axios.get(`/user/verify?hash=${hash}`),
  getMe: () => axios.get(`/user/me`),
}