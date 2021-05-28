import dialogsApi from '../../api/dialogs';

const actions = {
  setDialogs: items => ({
    type: 'DIALOGS:SET_ITEMS',
    payload: items
  }),

  setCurrentDialog: id => ({
    type: 'DIALOGS:SET_CURRENT_DIALOG',
    payload: id
  }),

  fetchDialogs: () => dispatch => {
    dialogsApi.getAll().then(({data}) => {
      dispatch(actions.setDialogs(data))
    })
  }
};

export default actions;