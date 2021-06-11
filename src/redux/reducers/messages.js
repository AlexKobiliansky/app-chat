const initialState = {
  items: null,
  isLoading: false
}

export default function messagesReducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'MESSAGES:SET_ITEMS':
      return {
        ...state,
        items: payload,
        isLoading: false
      }
    case 'MESSAGES:SET_IS_LOADING':
      return {
        ...state,
        isLoading: payload
      }
    case 'MESSAGES:ADD_MESSAGE':
      return {
        ...state,
        items: [
          ...state.items,
          payload
        ],
      }
    case 'MESSAGES:DELETE_MESSAGE':
      return {
        ...state,
        items: state.items.filter(message => message._id !== payload),
      }
    default:
      return state
  }
}