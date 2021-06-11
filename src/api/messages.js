import axios from '../core/axios';

export default {
  getAllByDialogId: (id) => axios.get(`/messages?dialog=${id}`),
  send: (text, dialogId) => axios.post(`/messages`, {
    'text': text,
    'dialog_id': dialogId
  }),
  removeById: (id) => axios.delete(`/messages/${id}`)
}