import axios from '../core/axios';

export default {
  getAllByDialogId: (id) => axios.get(`/messages?dialog=${id}`)
}