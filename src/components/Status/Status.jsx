import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Status.sass';

const Status = ({online}) => {
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