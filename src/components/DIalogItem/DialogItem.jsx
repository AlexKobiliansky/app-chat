import React from 'react';
import IconReaded from '../IconReaded/IconReaded';
import classNames from 'classnames';
import './DialogItem.sass';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';
import Avatar from '../Avatar/Avatar';
import {Link} from "react-router-dom";
import {isAudio} from '../../helpers/isAudio';

const getMessageTime = updatedAt => {
  const date = parseISO(updatedAt)
  if (isToday(date)) {
    return format(date, 'HH:mm')
  } else {
    return format(date, 'dd.MM.yyyy')
  }
}

const renderLastMessage = (message, userId) => {
  let text = '';

  if (!message.text && message.attachments.length) {
    text = 'файл';
  } else {
    text = message.text
  }

  return `${message.user._id === userId ? 'Вы: ' : ''}${text}`;
}

const DialogItem = ({_id, user, unreaded, isMe, updatedAt, text, onSelect, currentDialogId, lastMessage, partner, userId}) => {

  return (
    <Link to={`/dialog/${_id}`}>
      <div
        className={classNames(
          "dialogs__item",
          {"dialogs__item-online": partner.online},
          {"dialogs__item--selected": currentDialogId === _id}
        )}
      >
        <div className="dialogs__item-avatar">
          <Avatar {...partner} />
        </div>
        <div className="dialogs__item-info">
          <div className="dialogs__item-info-top">
            <b>{partner.fullName}</b>
            <span>
            {getMessageTime(lastMessage.updatedAt)}
          </span>
          </div>
          <div className="dialogs__item-info-bottom">
            <p>{ renderLastMessage(lastMessage, userId) }</p>
            {isMe && <IconReaded isMe={true} isReaded={false}/>}

            {lastMessage.readed > 0 &&
            <div className={classNames("dialogs__item-count", {'unreaded-many': lastMessage.unreaded > 100})}>
              {lastMessage.readed < 100 ? lastMessage.readed : '99+'}
            </div>}
          </div>
        </div>
      </div>
    </Link>
  );

};

export default DialogItem;