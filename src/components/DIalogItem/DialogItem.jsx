import React from 'react';
import IconReaded from '../IconReaded/IconReaded';
import classNames from 'classnames';
import './DialogItem.sass';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';
import Avatar from '../Avatar/Avatar';

const getMessageTime = updatedAt => {
  const date = parseISO(updatedAt)
  if (isToday(date)) {
    return format(date, 'HH:mm')
  } else {
    return format(date, 'dd.MM.yyyy')
  }
}

const DialogItem = ({_id, user, unreaded, isMe, updatedAt, text, onSelect, currentDialogId, lastMessage}) => {


  return (
    <div
      className={classNames(
        "dialogs__item",
        {"dialogs__item-online": lastMessage.user.online},
        {"dialogs__item--selected": currentDialogId === _id}
        )}
      onClick={() => onSelect(_id)}
    >
      <div className="dialogs__item-avatar">
        <Avatar {...lastMessage.user} />
      </div>
      <div className="dialogs__item-info">
        <div className="dialogs__item-info-top">
          <b>{lastMessage.user.fullname}</b>
          <span>
            {getMessageTime(lastMessage.updatedAt)}
          </span>
        </div>
        <div className="dialogs__item-info-bottom">
          <p>{lastMessage.text}</p>
          { isMe && <IconReaded isMe={true} isReaded={false}/>}

          {lastMessage.unreaded > 0 &&
          <div className={classNames("dialogs__item-count", {'unreaded-many': lastMessage.unreaded > 100})}>
            {lastMessage.unreaded < 100 ? lastMessage.unreaded : '99+'}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default DialogItem;