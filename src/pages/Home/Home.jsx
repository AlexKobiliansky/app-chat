import React from 'react';
import Message from '../../components/Message/Message';
import DialogItem from '../../components/DIalogItem/DialogItem';
import Dialogs from '../../components/Dialogs/Dialogs';


const Home = () => {
  return (
    <div className="home">

      <Dialogs
        userId={0}
        items={[
          {
            _id: 'sd3ce9225fca3e988c2af215d4e544d3',
            text: 'Lorem ipsum dolor sit amet, consectetur.',
            isReaded: true,
            updatedAt: '2021-04-23T13:51:50',
            user: {
              _id: 'sd3ce9225fca3e988c2af215d4e544d3',
              fullname: 'Дмитрий Новиков1',
              avatar: 'https://source.unsplash.com/random/100x100',
            }
          },
          {
            _id: '345ce9225fca3e988c2af215d4e544d3',
            text: 'Lorem ipsum dolor sit amet, consectetur.',
            isReaded: true,
            updatedAt: '2021-04-22T13:51:50',
            user: {
              _id: '345ce9225fca3e988c2af215d4e544d3',
              fullname: 'Дмитрий Новиков1',
              avatar: null,
            }
          }
      ]} />


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

export default Home;