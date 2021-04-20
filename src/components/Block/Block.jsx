import React from 'react';
import classNames from "classnames";
import './Block.sass';

const Block = ({children, className}) =>  <div className={classNames('block', className)}>{children}</div>

export default Block;