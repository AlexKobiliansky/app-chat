import React, {useEffect, useRef, useState} from 'react';
import Message from '../Message/Message';
import messagesActions from '../../redux/actions/messages';
import {Empty, Spin} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import classNames from "classnames";
import './Messages.sass';
import socket from "../../core/socket";

const Messages = () => {
  const dispatch = useDispatch();
  const user = useSelector(({users}) => users.data);
  const messages = useSelector(({messages}) => messages.items);
  const isLoading = useSelector(({messages}) => messages.isLoading);
  const dialogId = useSelector(({dialogs}) => dialogs.currentDialogId);
  const messagesRef = useRef(null);
  const [chatInputHeight, setChatInputHeight] = useState(138+68)




  const onNewMessage = data => {
    dispatch(messagesActions.addMessage(data))
  }

  useEffect(() => {
    setChatInputHeight(document.querySelector('.chat__dialog-input').clientHeight + 68);
}, [])

  useEffect(() => {
    if (dialogId) {
      dispatch(messagesActions.fetchMessages(dialogId))
    }

    socket.on('SERVER:NEW_MESSAGE', onNewMessage)

    return () => {
      socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogId]);

  useEffect(() => {
    if (dialogId) {
      messagesRef.current.scrollTo(0, 99999)
    }
  }, [messages]);

  if (!dialogId) {
    return null
  }



  return (
    <div
      className={classNames('chat__dialog-messages', {'chat__dialog-isloading': isLoading})}
      ref={messagesRef}
      style={{height: `calc(100% - ${chatInputHeight}px)`}}
    >
      {isLoading && !user
        ? <Spin tip="Загрузка..." size="large" />
        : messages && !isLoading
          ? messages?.length
            ? messages.map(item => <Message {...item} key={item._id} isMe={user._id === item.user._id} id={item._id}/>)
            : <Empty description="Диалог пуст"/>

          : <Empty description="Откройте диалог"/>
      }
    </div>
  )
};

export default Messages;