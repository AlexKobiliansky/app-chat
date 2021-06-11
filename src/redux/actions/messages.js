import messagesApi from '../../api/messages';

const actions = {
  setMessages: items => ({
    type: 'MESSAGES:SET_ITEMS',
    payload: items
  }),

  setIsLoading: bool => ({
    type: 'MESSAGES:SET_IS_LOADING',
    payload: bool
  }),

  addMessage: message => (dispatch, getState) => {
    const {dialogs} = getState();
    const {currentDialogId} = dialogs;

    if (currentDialogId === message.dialog._id) {
      dispatch({
        type: 'MESSAGES:ADD_MESSAGE',
        payload: message
      })
    }
  },

  fetchSendMessage: (text, dialogId) => dispatch => {
    messagesApi.send(text, dialogId);
  },

  fetchMessages: (dialogId) => dispatch => {
    dispatch(actions.setIsLoading(true));
    messagesApi.getAllByDialogId(dialogId).then(({data}) => {
      dispatch(actions.setMessages(data));
    }).catch(() => {
      dispatch(actions.setIsLoading(false));
    })
  },

  removeMessageById: (messageId) => dispatch => {

    dispatch({
      type: 'MESSAGES:DELETE_MESSAGE',
      payload: messageId
    });

    messagesApi.removeById(messageId).then(({data}) => {

    }).catch(() => {

    })
  }
};

export default actions;