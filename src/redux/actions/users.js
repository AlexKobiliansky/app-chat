import usersApi from '../../api/users';
import openNotification from "../../helpers/openNotification";

const actions = {
  setUserData: data => ({
    type: 'USERS:SET_DATA',
    payload: data
  }),

  fetchUserData: () => dispatch =>{
    usersApi.getMe().then(({data}) => {
      dispatch(actions.setUserData(data));
    })
  },

  fetchUserLogin: (postData) => dispatch => {
    return usersApi.login(postData).then(({data}) => {
      const {status, token} = data;

      if (status === 'error') {
        openNotification({
          title: 'Ошибка при авторизации',
          text: 'Неверный логин или пароль',
          type: 'error'
        })
      } else {
        openNotification({
          title: 'Авторизация успешна!',
          text: 'Все супер, вы авторизовались!',
          type: 'success',
        });

        window.axios.defaults.headers.common['token'] = token;
        window.localStorage['token'] = token;

        dispatch(actions.fetchUserData());
      }
    })
  },

  fetchUserRegister: (postData) => dispatch => {
    return usersApi.register(postData).then(({data}) => {
      const {status, token} = data;

      console.log(data)

      // if (status === 'error') {
      //   openNotification({
      //     title: 'Ошибка при регистрации',
      //     text: 'Неверный логин или пароль',
      //     type: 'error'
      //   })
      // } else {
      //   openNotification({
      //     title: 'Авторизация успешна!',
      //     text: 'Все супер, вы авторизовались!',
      //     type: 'success',
      //   });
      //
      //   window.axios.defaults.headers.common['token'] = token;
      //   window.localStorage['token'] = token;
      //
      //   dispatch(actions.fetchUserData());
      // }



    })
  }
};

export default actions;