const initialState = {
  items: []
}

export default function usersReducer(state = initialState, {type, payload}) {
  switch (type) {
    case "ATTACHMENTS:ADD_FILE":
      return {
        ...state,
        items: [
            ...state.items,
            payload
        ]
      };
    case "ATTACHMENTS:REMOVE_FILE":
      return {
        ...state,
        items: state.items.filter(file => file._id !== payload)
      }
    default:
      return state
  }
}