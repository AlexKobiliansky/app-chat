import React, {useState} from 'react';
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import AudioOutlined from '@ant-design/icons/AudioOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import {Input} from 'antd';
import './ChatInput.sass';
import {UploadField} from '@navjobs/upload';
import {Picker} from 'emoji-mart';

const ChatInput = () => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const toggleEmojiVisible = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  }

  return (
    <div className="chat-input">
      <div className="chat-input__smile">
        {emojiPickerVisible &&
        <div className="chat-input__emoji-picker">
          <Picker set='apple'/>
        </div>
        }

        <SmileOutlined onClick={toggleEmojiVisible}/>
      </div>
      <Input
        size="large"
        placeholder="Введите текст сообщения..."
      />
      <div className="chat-input__actions">
        <UploadField
          onFiles={files => console.log(files)}
          containerProps={{
            className: 'photos'
          }}
          uploadProps={{
            accept: '.jpg,.jpeg,.png,.gif,.bmp',
            multiple: 'multiple'
          }}

        >
          <CameraOutlined/>
        </UploadField>

        <AudioOutlined/>
        <SendOutlined/>
      </div>
    </div>
  );
};

export default ChatInput;