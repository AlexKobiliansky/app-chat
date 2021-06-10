import usersApi from '../../api/users';
import openNotification from "../../helpers/openNotification";

const actions = {
  setUserData: data => ({
    type: 'USERS:SET_DATA',
    payload: data
  }),

  setIsAuth: bool => ({
    type: 'USERS:SET_IS_AUTH',
    payload: bool
  }),

  fetchUserData: () => dispatch =>{
    usersApi.getMe().then(({data}) => {
      dispatch(actions.setUserData(data));
    }).catch(err => {
      if (err.response.status === 403) {
        dispatch(actions.setIsAuth(false));
        delete window.localStorage.token;
      }
    })
  },

  fetchUserLogin: (postData) => dispatch => {
    return usersApi.login(postData).then(({data}) => {
      const {token} = data;
        openNotification({
          title: 'Авторизация успешна!',
          text: 'Все супер, вы авторизовались!',
          type: 'success',
        });

        window.axios.defaults.headers.common['token'] = token;
        window.localStorage['token'] = token;

        dispatch(actions.fetchUserData());
    }).catch(({response}) => {
      if (response.status === 403) {
        openNotification({
          title: 'Ошибка при авторизации',
          text: 'Неверный логин или пароль',
          type: 'error'
        })
      }
    })
  },

  fetchUserRegister: (postData) => dispatch => {
    return usersApi.register(postData).then(({data}) => {
      const {status, token} = data;



      return data
    })
  }
};

export default actions;