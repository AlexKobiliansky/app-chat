import React from 'react';
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import AudioOutlined from '@ant-design/icons/AudioOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import {Input} from 'antd';
import './ChatInput.sass';

const ChatInput = () => {
  return (
    <div className="chat-input">
      <div className="chat-input__smile">
        <SmileOutlined onClick={() => console.log('smile :)')}/>
      </div>
      <Input
        size="large"
        placeholder="Введите текст сообщения..."
      />
      <div className="chat-input__actions">
        <CameraOutlined />
        <AudioOutlined />
        <SendOutlined />
      </div>
    </div>
  );
};

export default ChatInput;