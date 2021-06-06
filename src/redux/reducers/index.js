import {combineReducers} from 'redux';
import dialogs from './dialogs';
import messages from './messages';
import users from './users';

export default combineReducers({
  dialogs,
  messages,
  users
})