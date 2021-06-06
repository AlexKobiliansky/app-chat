const initialState = {
  data: null,
  isAuth: false,
  token: window.localStorage.token
}

export default function usersReducer(state = initialState, {type, payload}) {
  switch (type) {
    case "USERS:SET_DATA":
      return {
        ...state,
        data: payload,
        isAuth: true,
        token: window.localStorage.token
      }
    default:
      return state
  }
}