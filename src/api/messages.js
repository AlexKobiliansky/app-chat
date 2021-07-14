import axios from '../core/axios';

export default {
  getAllByDialogId: (id) => axios.get(`/messages?dialog=${id}`),
  send: (text, dialogId, attachments) => axios.post(`/messages`, {
    'text': text,
    'dialog_id': dialogId,
    'attachments': attachments
  }),
  removeById: (id) => axios.delete(`/messages/${id}`)
}