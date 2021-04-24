import React from 'react';
import DialogItem from '../DIalogItem/DialogItem';
import orderBy from 'lodash/orderBy';

const Dialogs = ({items, userId}) => {
  return (
    <div className="dialogs">
      {orderBy(items, ['updatedAt'], ['desc']).map(item => (
          <DialogItem
            key={item._id}
            user={item.user}
            message={item}
            unreaded={0}
            isMe={item.user._id === userId }
          />
        ))}
    </div>
  );
};

export default Dialogs;