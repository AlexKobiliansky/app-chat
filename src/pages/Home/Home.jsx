import React from 'react';
import Dialogs from '../../components/Dialogs/Dialogs';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import FormOutlined from '@ant-design/icons/FormOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import './Home.sass';
import Status from '../../components/Status/Status';
import ChatInput from '../../components/ChatInput/ChatInput';
import Messages from '../../components/Messages/Messages';
import dialogs from '../../assets/dialogs.json'

const Home = () => {
  return (
    <div className="home">

      <div className="chat">
        <div className="chat__sidebar">
          <div className="chat__sidebar-header">
            <div>
              <TeamOutlined />
              <span>Список диалогов</span>
            </div>
            <FormOutlined />
          </div>

          <div className="chat__sidebar-dialogs">
            <Dialogs
              userId={0}
              items={dialogs} />
          </div>
        </div>
        <div className="chat__dialog">
          <div className="chat__dialog-header">
            <div />
            <div className="chat__dialog-header-center">
              <b className="chat__dialog-header-username">Дмитрий Новиков</b>
              <div className="chat__dialog-header-status">
                <Status online={true}/>
              </div>
            </div>
            <EllipsisOutlined style={{fontSize: "22px"}}/>
          </div>

          <Messages />

          <div className="chat__dialog-input">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;