const initialState = {
  items: [],
  currentDialogId: null,
  isLoading: false
}

export default function dialogsReducer (state = initialState, {type, payload}) {
  switch (type) {
    case 'DIALOGS:SET_ITEMS':
      return {
        ...state,
        items: payload
      }
    case 'DIALOGS:SET_CURRENT_DIALOG':
      return {
        ...state,
        currentDialogId: payload
      }
    default:
      return state
  }
}