import React, {useState} from 'react';
import DialogItem from '../DIalogItem/DialogItem';
import orderBy from 'lodash/orderBy';
import {Input} from 'antd';
import { Empty } from 'antd';
import './Dialogs.sass';

const Dialogs = ({items, userId}) => {
  let [filtered, setFiltered] = useState(items);

  const onChangeInput = value => {
    setFiltered(items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0));
  }

  return (
    <div className="dialogs">
      <div className="dialogs-search">
        <Input.Search
          placeholder="Поиск среди контактов"
          onSearch = {onChangeInput}
          onChange={(e) => onChangeInput(e.target.value)}
        />
      </div>

      {filtered.length > 0
        ? orderBy(filtered, ['updatedAt'], ['desc']).map(item => (
          <DialogItem
            key={item._id}
            isMe={item.user._id === userId}
            {...item}
          />
        ))
      : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено" />}
    </div>
  );
};

export default Dialogs;