import React from 'react';
import distanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import readedSvg from '../../assets/img/readed.svg';
import noReadedSvg from '../../assets/img/noreaded.svg';

import './Message.sass';

const Message = ({avatar, user, text, date, isMe, isReaded, attachments}) => {
  return (
    <div className={classNames('message', {'message__isme': isMe})}>
      <div className="message__avatar">
        <img src={avatar} alt={`Avatar ${user.fullname}`}/>
      </div>
      <div className="message__content">
        { isMe && isReaded
          ? <img src={readedSvg} alt="readed icon" className="message__icon" />
          : <img src={noReadedSvg} alt="readed icon" className="message__icon" />
        }
          <div className="message__bubble">
            <p className="message__text">{text}</p>
          </div>

          {attachments &&
          <div className="message__attachments">
            {attachments?.map(item => (
              <div key={item.filename} className="message__attachments-item">
                <img src={item.url} alt={item.filename}/>
              </div>
            ))}
          </div>}

          <div className="message__date">{distanceToNow(new Date(date) , { addSuffix: true, locale: ruLocale })}</div>
        </div>
    </div>
  );
};

Message.defaultProps = {
  user: {},
  isMe: false
}

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  attachments: PropTypes.array
}

export default Message;