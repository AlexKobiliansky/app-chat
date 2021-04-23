import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Time from '../Time/Time';

import './Message.sass';
import IconReaded from '../IconReaded/IconReaded';

const Message = ({
  avatar,
  user,
  text,
  date,
  isMe,
  isReaded,
  attachments,
  isTyping
}) => {
  return (
    <div className={classNames('message', {
      'message__isme': isMe,
      'message__is-typing': isTyping,
      'message__image': attachments?.length === 1
    })}>
      <div className="message__avatar">
        <img src={avatar} alt={`Avatar ${user.fullname}`}/>
      </div>
      <div className="message__content">
        <IconReaded isMe={isMe} isReaded={isReaded} />
        {(text || isTyping) && <div className="message__bubble">
          {text && <p className="message__text">{text}</p>}
          {isTyping &&
          <div className="message__typing">
            <span /><span /><span />
          </div>}
        </div>}

        {attachments &&
        <div className="message__attachments">
          {attachments?.map((item, index) => (
            <div key={index} className="message__attachments-item">
              <img src={item.url} alt={item.filename}/>
            </div>
          ))}
        </div>}

        {date && <div className="message__date">
          <Time date={date}/>
        </div>}
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
  attachments: PropTypes.array,
  isTyping: PropTypes.bool,
  isReaded: PropTypes.bool
}

export default Message;