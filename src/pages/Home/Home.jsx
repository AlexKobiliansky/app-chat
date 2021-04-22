import React from 'react';
import Message from '../../components/Message/Message';

const Home = () => {
  return (
    <div className="home">
      <Message
        avatar="https://source.unsplash.com/random/100x100"
        text="Hello Lorem ipsum dolor sit ame"
        date="Thu Apr 22 2021 06:54:46"
        isMe={true}
        isReaded={true}
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
    </div>
  );
};

export default Home;