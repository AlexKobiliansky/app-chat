import React, {useEffect} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Status.sass';
import {useSelector} from "react-redux";

const Status = () => {
  const dialogId = useSelector(({dialogs}) => dialogs.currentDialogId);
  const user = useSelector(({users}) => users.data);
  const dialogs = useSelector(({dialogs}) => dialogs.items);
  let online = false;
  let currentDialogObj;

  if (!dialogs.length || !dialogId) {
    return null;
  }

  currentDialogObj = dialogs.filter(dialog => dialog._id === dialogId)[0];

  if (currentDialogObj.author._id === user._id) {
    online = currentDialogObj.partner.online
  } else {
    online = currentDialogObj.author.online
  }

  return (
    <span className={classNames('status', {'status--online': online})}>
      {online ? 'онлайн' : 'офлайн'}
    </span>
  );
};

Status.propTypes = {
  online: PropTypes.bool
}

export default Status;