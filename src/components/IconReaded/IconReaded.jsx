import React from 'react';
import readedSvg from '../../assets/img/readed.svg';
import noReadedSvg from '../../assets/img/noreaded.svg';
import PropTypes from 'prop-types';

const IconReaded = ({isMe, isReaded}) => (
  isMe && (isReaded
      ? <img src={readedSvg} alt="readed icon" className="message__icon"/>
      : <img src={noReadedSvg} alt="readed icon" className="message__icon"/>
  )
);

IconReaded.propTypes = {
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool
}

export default IconReaded;