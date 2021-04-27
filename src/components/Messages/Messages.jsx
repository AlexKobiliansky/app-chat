import React from 'react';
import Message from '../Message/Message';

const Messages = ({items}) => {
  return (
    <div className="chat__dialog-messages">
      <Message
        avatar="https://source.unsplash.com/random/100x100"
        // text="Это аудио сообщение"
        date="Thu Apr 22 2021 06:54:46"
        audio='https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
      />

      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={false}
      />

      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={false}
      />
      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={false}
      />
      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={false}
      />
      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={false}
      />
      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={false}
      />
      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={false}
      />
      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={false}
      />

      <Message
        avatar="https://source.unsplash.com/random/100x100"
        isMe={true}
        isReaded={true}
        isTyping={true}
      />

      <Message
        avatar="https://source.unsplash.com/random/100x100?2"
        text="Lorem "
        date="Thu Apr 22 2021 07:44:46"
        isMe={false}
        isReaded={true}
        attachments={[
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/random/100x100?3'
          },
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/random/100x100?4'
          },
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/random/100x100?5'
          },
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/random/100x100?3'
          },
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/random/100x100?4'
          },
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/random/100x100?5'
          }
        ]}
      />

      <Message
        avatar="https://source.unsplash.com/random/100x100?2"
        isMe={false}
        isTyping={true}
      />

      <Message
        avatar="https://source.unsplash.com/random/100x100?2"
        text={null}
        date="Thu Apr 22 2021 07:44:46"
        isMe={false}
        isReaded={true}
        attachments={[
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/random/100x100?3'
          }
        ]}
      />
    </div>
  );
};

export default Messages;