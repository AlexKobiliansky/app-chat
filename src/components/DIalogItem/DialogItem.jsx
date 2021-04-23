import React from 'react';
import Time from '../Time/Time';
import IconReaded from '../IconReaded/IconReaded';
import classNames from 'classnames';
import './DialogItem.sass';

const DialogItem = ({user, message, unreaded}) => {

  const getAvatar = avatar => {
    if (avatar) {
      return <img src={avatar} alt='alt'/>
    } else {
      //make avatar
    }
  }

  return (
    <div className={classNames("dialogs__item", {"dialogs__item-online": user.online})}>
      <div className="dialogs__item-avatar">
        {/*<img src={user.avatar} alt={user.fullname}/>*/}
        {getAvatar('https://source.unsplash.com/random/100x100')}
      </div>
      <div className="dialogs__item-info">
        <div className="dialogs__item-info-top">
          <b>Дмитрий новиков</b>
          <span>
            {/*<Time date={new Date()}/>*/}
            09:25
          </span>
        </div>
        <div className="dialogs__item-info-bottom">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, impedit!</p>
          <IconReaded isMe={true} isReaded={false} />
          {unreaded > 0 && <div className={classNames("dialogs__item-count", {'unreaded-many': unreaded > 100})}>{unreaded < 100 ? unreaded : '99+'}</div>}

        </div>
      </div>
    </div>
  );
};

export default DialogItem;