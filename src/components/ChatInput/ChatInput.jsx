import React, {useState} from 'react';
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import AudioOutlined from '@ant-design/icons/AudioOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import {Input} from 'antd';
import './ChatInput.sass';
import {UploadField} from '@navjobs/upload';
import {Picker} from 'emoji-mart';
import {useDispatch, useSelector} from "react-redux";
import messagesActions from "../../redux/actions/messages";

const {TextArea} = Input;

const ChatInput = () => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const currentDialogId = useSelector(({dialogs}) => dialogs.currentDialogId);

  const toggleEmojiVisible = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  }

  const onSendMessage = (e) => {
    if (e.key === 'Enter') {
      dispatch(messagesActions.fetchSendMessage(value, currentDialogId))
      setValue('');
    }
  }

  const addEmojiToMessage = ({colons}) => {
    setValue((value + ' ' + colons).trim());
  }

  return (
    <div className="chat-input">
      <div className="chat-input__smile">
        {emojiPickerVisible &&
        <div className="chat-input__emoji-picker">
          <Picker set='apple' onSelect={(emojiTag) => addEmojiToMessage(emojiTag)}/>
        </div>
        }

        <SmileOutlined onClick={toggleEmojiVisible}/>
      </div>
      <TextArea
        onChange={e => setValue(e.target.value)}
        onKeyUp={onSendMessage}
        size="large"
        placeholder="Введите текст сообщения..."
        value={value}
        autoSize={{minRows:1, maxRows:10}} 
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