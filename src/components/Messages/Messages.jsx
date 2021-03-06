import React, {useEffect, useRef, useState} from 'react';
import Message from '../Message/Message';
import messagesActions from '../../redux/actions/messages';
import {Empty, Spin} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import classNames from "classnames";
import './Messages.sass';
import socket from "../../core/socket";
import {Modal} from 'antd';

const Messages = () => {
  const dispatch = useDispatch();
  const user = useSelector(({users}) => users.data);
  const messages = useSelector(({messages}) => messages.items);
  const isLoading = useSelector(({messages}) => messages.isLoading);
  const dialogId = useSelector(({dialogs}) => dialogs.currentDialogId);
  const messagesRef = useRef(null);
  const [chatInputHeight, setChatInputHeight] = useState(138 + 68);
  const [previewImage, setPreviewImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeoutId = null;

  const onNewMessage = data => {
    dispatch(messagesActions.addMessage(data))
  }

  useEffect(() => {
    setChatInputHeight(document.querySelector('.chat__dialog-input').clientHeight + 68);
  }, []);

  const toggleIsTyping = () => {
    setIsTyping(true);
    clearInterval(typingTimeoutId);
    typingTimeoutId = setTimeout(() => {
      setIsTyping(false)
    }, 3000)

  }

  useEffect(() => {
    socket.on('DIALOGS:TYPING', toggleIsTyping);
    return () => {
      socket.remove('DIALOGS:TYPING', toggleIsTyping);
    }
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
        ? <Spin tip="????????????????..." size="large"/>
        : messages && !isLoading
          ? messages?.length
            ? messages.map(item =>
              <Message
                key={item._id}
                {...item}
                isMe={user._id === item.user._id}
                id={item._id}
                setPreviewImage={setPreviewImage}
                isTyping={isTyping}
              />)
            : <Empty description="???????????? ????????"/>

          : <Empty description="???????????????? ????????????"/>
      }

      <Modal
        className="preview-image"
        title={null}
        visible={!!previewImage}
        onCancel={() => setPreviewImage(false)}
        footer={null}
        bodyStyle={{padding: '0px', fontSize: '0px'}}
      >
        <img src={previewImage} alt="Preview"/>
      </Modal>
    </div>
  )
};

export default Messages;