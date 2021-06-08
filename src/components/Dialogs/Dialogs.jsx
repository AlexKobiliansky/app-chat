import React, {useEffect, useState} from 'react';
import DialogItem from '../DIalogItem/DialogItem';
import orderBy from 'lodash/orderBy';
import { Input, Empty } from 'antd';
import dialogsActions from '../../redux/actions/dialogs';
import './Dialogs.sass';
import {useDispatch, useSelector} from 'react-redux';
import socket from'../../core/socket';

const Dialogs = ({items, userId}) => {
  let [filtered, setFiltered] = useState('');
  const dispatch = useDispatch();
  const dialogs = useSelector(({dialogs}) => dialogs.items);
  const currentDialogId = useSelector(({dialogs}) => dialogs.currentDialogId);

  const onChangeInput = value => {
    setFiltered(dialogs.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0));
  }

  useEffect(() => {
    if (!dialogs.length) {
      dispatch(dialogsActions.fetchDialogs());
    }
    setFiltered(dialogs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogs]);

  const onSelectDialog = (id) => {
    dispatch(dialogsActions.setCurrentDialog(id))
  }

  socket.on('SERVER:DIALOG_CREATED', (data) => {
    console.log(data)
    dispatch(dialogsActions.fetchDialogs());
  })

  return (
    <div className="dialogs">
      <div className="dialogs-search">
        <Input.Search
          placeholder="Поиск среди контактов"
          onSearch = {onChangeInput}
          onChange={(e) => onChangeInput(e.target.value)}
        />
      </div>

      {filtered?.length > 0
        ? orderBy(filtered, ['updatedAt'], ['desc']).map(item => (
          <DialogItem
            key={item._id}
            isMe={item.author._id === userId}
            onSelect = {onSelectDialog}
            currentDialogId={currentDialogId}
            {...item}
          />
        ))
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено" />}
    </div>
  );
};

export default Dialogs;