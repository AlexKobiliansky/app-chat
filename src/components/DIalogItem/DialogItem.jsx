import React from 'react';
import IconReaded from '../IconReaded/IconReaded';
import classNames from 'classnames';
import './DialogItem.sass';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';


const getAvatar = avatar => {
  if (avatar) {
    return <img src={avatar} alt='alt'/>
  } else {
    //make avatar
  }
}

const getMessageTime = updatedAt => {
  const date = parseISO(updatedAt)
  if (isToday(date)) {
    return format(date, 'HH:mm')
  } else {
    return format(date, 'dd.MM.yyyy')
  }
}

const DialogItem = ({user, message, unreaded, isMe}) => {
  return (
    <div className={classNames("dialogs__item", {"dialogs__item-online": user.online})}>
      <div className="dialogs__item-avatar">
        {/*<img src={user.avatar} alt={user.fullname}/>*/}
        {getAvatar(user.avatar)}
      </div>
      <div className="dialogs__item-info">
        <div className="dialogs__item-info-top">
          <b>{user.fullname}</b>
          <span>
            {getMessageTime(message.updatedAt)}
          </span>
        </div>
        <div className="dialogs__item-info-bottom">
          <p>{message.text}</p>
          { isMe && <IconReaded isMe={true} isReaded={false}/>}

          {unreaded > 0 &&
          <div className={classNames("dialogs__item-count", {'unreaded-many': unreaded > 100})}>
            {unreaded < 100 ? unreaded : '99+'}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default DialogItem;