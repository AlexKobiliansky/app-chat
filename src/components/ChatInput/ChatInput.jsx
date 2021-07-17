import React, {useEffect, useState} from 'react';
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import AudioOutlined from '@ant-design/icons/AudioOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import {Empty, Input} from 'antd';
import './ChatInput.sass';
import {UploadField} from '@navjobs/upload';
import {Picker} from 'emoji-mart';
import {useDispatch, useSelector} from "react-redux";
import messagesActions from "../../redux/actions/messages";
import attachmentsActions from "../../redux/actions/attachments";
import UploadFiles from "../UploadFiles/UploadFiles";
import filesApi from '../../api/files';
import {CheckOutlined, CheckSquareOutlined, CloseCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import socket from "../../core/socket";

const {TextArea} = Input;

const ChatInput = () => {


  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [value, setValue] = useState('');
  // const [attachments, setAttachments] = useState([]);
  const dispatch = useDispatch();
  const currentDialogId = useSelector(({dialogs}) => dialogs.currentDialogId);
  const attachments = useSelector(({attachments}) => attachments.items);
  const user = useSelector(({users}) => users.data);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isLoading, setLoading] = useState(false);



  const toggleEmojiVisible = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  }

  const sendMessage = () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else if (value) {
      dispatch(messagesActions.fetchSendMessage({
        text: value,
        dialogId: currentDialogId,
        attachments: attachments.map(file => file.uid)
      }))
      setValue('');
      dispatch(attachmentsActions.setAttachments([]));
    }
  };


  const handleSendMessage = (e) => {
    socket.emit("DIALOGS:TYPING", { dialogId: currentDialogId, user });
    if (e.keyCode === 13) {
      sendMessage();
    }
  }

  const addEmojiToMessage = ({colons}) => {
    setValue((value + ' ' + colons).trim());
  }

  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setEmojiPickerVisible(false)
    }
  };

  useEffect(() => {
    const el = document.querySelector('.chat-input__smile-btn');
    document.addEventListener('click', handleOutsideClick.bind(this, el));

    return () => {
      document.removeEventListener('click', handleOutsideClick.bind(this, el));
    }
  }, []);

  const onSelectFiles = async files => {
    let uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: "uploading"
        }
      ];
      dispatch(attachmentsActions.setAttachments(uploaded));
      //eslint-disable-next-line no-loop-func

      await filesApi.upload(file).then(({ data }) => {
        uploaded = uploaded.map(item => {
          if (item.uid === uid) {
            return {
              status: "done",
              uid: data.file._id,
              name: data.file.filename,
              url: data.file.url
            };
          }
          return item;
        });

      });
    }
    dispatch(attachmentsActions.setAttachments(uploaded));
  };

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = stream => {
    const recorder = new MediaRecorder(stream);

    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = e => {
      const file = new File([e.data], "audio.webm");
      setLoading(true);
      filesApi.upload(file).then(({ data }) => {
        sendAudio(data.file._id).then(() => {
          setLoading(false);
        });
        // sendAudio(data.file._id);
        // setLoading(false);
      });
    };
  };

  const onError = err => {
    console.log("The following error occured: " + err);
  };

  const sendAudio = audioId => {
    return dispatch(messagesActions.fetchSendMessage({
      text: null,
      dialogId: currentDialogId,
      attachments: [audioId]
    }));
  };

  const onStopRecording = () => {
    setIsRecording(false);
  };

  if (!currentDialogId) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Откройте диалог" />;
  }

  return (
    <div className="chat-input">
      <div className="chat-input__smile">
        <div className="chat-input__emoji-picker">
          {emojiPickerVisible &&
          <div className="chat-input__emoji-picker">
            <Picker set='apple' onSelect={(emojiTag) => addEmojiToMessage(emojiTag)}/>
          </div>
          }
        </div>
        <SmileOutlined onClick={toggleEmojiVisible} className="chat-input__smile-btn" />
      </div>
      {isRecording ? (<div className="chat-input__record-status">
        <i></i>
        Recording...
        <CloseCircleOutlined onClick={onStopRecording}/>
      </div>) : (
        <TextArea
          onChange={e => setValue(e.target.value)}
          onKeyUp={handleSendMessage}
          size="large"
          placeholder="Введите текст сообщения..."
          value={value}
          autoSize={{minRows:1, maxRows:10}}
        />
      )}

      <div className="chat-input__actions">
        <UploadField
          onFiles={onSelectFiles}
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

        {isLoading
          ? <LoadingOutlined />
          : isRecording || value || attachments.length ? (
          <CheckSquareOutlined />
        ) : (
          <div className="chat-input_record-btn">
            <AudioOutlined onClick={onRecord}/>
          </div>
        )}


        <SendOutlined onClick={sendMessage}/>
      </div>
      <div><UploadFiles attachments={attachments} /></div>
    </div>
  );
};

export default ChatInput;