import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Time from '../Time/Time';

import './Message.sass';
import IconReaded from '../IconReaded/IconReaded';
import waveIcon from '../../assets/img/wave.svg';
import pauseIcon from '../../assets/img/pause.svg';
import playIcon from '../../assets/img/play.svg';

import {convertCurrentTime} from '../../helpers/convertCurrentTime';
import {isAudio} from '../../helpers/isAudio';
import Avatar from "../Avatar/Avatar";
import { Emoji } from 'emoji-mart';
import {Button, Popover} from 'antd';
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";
import messagesActions from '../../redux/actions/messages';
import {useDispatch} from 'react-redux';
import reactStringReplace from "react-string-replace";
import {EyeOutlined} from "@ant-design/icons";



const Message = ({
  id,
  avatar,
  user,
  text,
  date,
  isMe,
  isReaded,
  attachments,
  isTyping,
  audio,
  setPreviewImage
}) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioEl = useRef(null);
  const dispatch = useDispatch();

  const renderAttachment = item => {
    // <div key={index} className="message__attachments-item" onClick={() => setPreviewImage(item.url)}>
    //
    //   <img src={item.url} alt={item.filename}/>
    //   <EyeOutlined />
    // </div>

    if (item.ext !== "webm") {
      return (
        <div
          key={item._id}
          onClick={() => setPreviewImage(item.url)}
          className="message__attachments-item"
        >
          <img src={item.url} alt={item.filename}/>
          <EyeOutlined />
        </div>
      );
    } else {
      return (
        <div className="message__audio">
          <audio ref={audioEl} src={item.url} preload="auto" />
          <div className="message__audio-progress" style={{width: progress + '%'}} />
          <div className="message__audio-info">
            <div className="message__audio-btn">
              <button onClick={togglePlay}>
                {isPlaying ? <img src={pauseIcon} alt="alt"/> : <img src={playIcon} alt="alt"/>}
              </button>
            </div>
            <div className="message__audio-wave">
              <img src={waveIcon} alt="alt"/>
            </div>
            <span className="message__audio-duration">
                {convertCurrentTime(currentTime)}
              </span>
          </div>
        </div>
      )
      // <MessageAudio key={item._id} audioSrc={item.url} />;
    }
  }


  const togglePlay = () => {
    if (!isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }

  useEffect(() => {
    if (audioEl.current) {
      audioEl.current.volume="0.05";
      audioEl.current.addEventListener('playing', () => setIsPlaying(true), false);
      audioEl.current.addEventListener('play', () => setIsPlaying(true), false);
      audioEl.current.addEventListener('pause', () => setIsPlaying(false), false);
      audioEl.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      }, false);
      audioEl.current.addEventListener('timeupdate', () => {
        setProgress((audioEl.current.currentTime/audioEl.current.duration) * 100);
        setCurrentTime(audioEl.current.currentTime);
      });
    }
  }, []);

  const onRemoveMessage = () => {
    dispatch(messagesActions.removeMessageById(id))
  };
  return (
    <div className={classNames('message', {
      'message__isme': isMe,
      'message__is-typing': isTyping,
      'message__image':
        !isAudio(attachments) &&
        attachments &&
        attachments.length === 1 &&
        !text,
      'message__is-audio': isAudio(attachments)
    })}>
      <div className="message__avatar">

        <Avatar {...user} />
        {/*<img src={avatar} alt={`Avatar ${user.fullname}`}/>*/}
      </div>

      <div className="message__content">
        <div className="message__icon-actions">
          <Popover
            content={
              <Button onClick={() => onRemoveMessage(id)}>Удалить сообщение</Button>
            }
            trigger="click"
          >
            <EllipsisOutlined style={{fontSize: "16px"}}/>
          </Popover>
        </div>

        <IconReaded isMe={isMe} isReaded={isReaded} />
        {(audio || text || isTyping) && <div className="message__bubble">
          {text && <p className="message__text">
            {reactStringReplace(text, /:(.+?):/g, (match, i) => (
              <Emoji emoji={match} set='apple' size={18}/>
            ))}
          </p>}

          {isTyping &&
          <div className="message__typing">
            <span /><span /><span />
          </div>}

          {audio &&
          <div className="message__audio">
            <audio ref={audioEl} src={audio} preload="auto" />
            <div className="message__audio-progress" style={{width: progress + '%'}} />
            <div className="message__audio-info">
              <div className="message__audio-btn">
                <button onClick={togglePlay}>
                  {isPlaying ? <img src={pauseIcon} alt="alt"/> : <img src={playIcon} alt="alt"/>}
                </button>
              </div>
              <div className="message__audio-wave">
                <img src={waveIcon} alt="alt"/>
              </div>
              <span className="message__audio-duration">
                {convertCurrentTime(currentTime)}
              </span>
            </div>
          </div>}

        </div>}

        {attachments &&
        <div className="message__attachments">
          {attachments?.map((item, index) => renderAttachment(item))}
        </div>}

        {date && <div className="message__date">
          <Time date={date}/>
        </div>}
      </div>
    </div>
  );
};

Message.defaultProps = {
  user: {},
  isMe: false
}

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  attachments: PropTypes.array,
  isTyping: PropTypes.bool,
  isReaded: PropTypes.bool
}

export default Message;