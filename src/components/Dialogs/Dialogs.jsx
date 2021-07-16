import React, {useEffect, useState} from 'react';
import DialogItem from '../DIalogItem/DialogItem';
import orderBy from 'lodash/orderBy';
import { Input, Empty } from 'antd';
import dialogsActions from '../../redux/actions/dialogs';
import './Dialogs.sass';
import {useDispatch, useSelector} from 'react-redux';
import socket from'../../core/socket';

const Dialogs = ({userId}) => {
  let [filtered, setFiltered] = useState('');
  const dispatch = useDispatch();
  const dialogs = useSelector(({dialogs}) => dialogs.items);
  const currentDialogId = useSelector(({dialogs}) => dialogs.currentDialogId);
  const [value, setValue] = useState("");

  const onChangeInput = (value = "") => {
    setFiltered(
      dialogs.filter(
        dialog =>
          dialog.author.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
          dialog.partner.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );
    setValue(value);
  };

  const onNewDialog = () => {
    dispatch(dialogsActions.fetchDialogs());
  }

  useEffect(() => {
    if (dialogs.length) {
      onChangeInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogs])

  useEffect(() => {
    dispatch(dialogsActions.fetchDialogs());

    socket.on('SERVER:DIALOG_CREATED', onNewDialog)
    socket.on('SERVER:NEW_MESSAGE', onNewDialog)
    return () => {
      socket.removeListener('SERVER:DIALOG_CREATED', onNewDialog)
      socket.removeListener('SERVER:NEW_MESSAGE', onNewDialog)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const onSelectDialog = (id) => {
  //   dispatch(dialogsActions.setCurrentDialog(id))
  // }

  return (
    <div className="dialogs">
      <div className="dialogs-search">
        <Input.Search
          placeholder="Поиск среди контактов"
          onSearch = {onChangeInput}
          onChange={(e) => onChangeInput(e.target.value)}
          value={value}
        />
      </div>

      {filtered?.length > 0
        ? orderBy(filtered, ['updatedAt'], ['desc']).map(item => (
          <DialogItem
            key={item._id}
            isMe={item.author._id === userId}
            // onSelect = {onSelectDialog}
            userId={userId}
            currentDialogId={currentDialogId}
            {...item}
          />
        ))
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено" />}
    </div>
  );
};

export default Dialogs;