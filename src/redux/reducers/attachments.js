const initialState = {
  items: []
}

export default function usersReducer(state = initialState, {type, payload}) {
  switch (type) {
    case "ATTACHMENTS:SET_ITEMS":
      return {
        ...state,
        items: payload
      };
    case "ATTACHMENTS:REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(file => file.uid !== payload.uid)
      }
    default:
      return state
  }
}