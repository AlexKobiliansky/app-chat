import {combineReducers} from 'redux';
import dialogs from './dialogs';
import messages from './messages';
import users from './users';
import attachments from './attachments';

export default combineReducers({
  dialogs,
  messages,
  users,
  attachments
})