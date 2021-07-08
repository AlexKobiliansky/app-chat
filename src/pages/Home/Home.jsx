import React, {useEffect} from 'react';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import {useLocation} from 'react-router-dom';
import './Home.sass';
import Status from '../../components/Status/Status';
import ChatInput from '../../components/ChatInput/ChatInput';
import Messages from '../../components/Messages/Messages';
import Sidebar from "../../components/Sidebar/Sidebar";
import dialogsActions from '../../redux/actions/dialogs';
import {useDispatch} from "react-redux";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const dialogId = location.pathname.split('/').pop();

    dispatch(dialogsActions.setCurrentDialog(dialogId));

  }, [location.pathname])

  return (
    <div className="home">

      <div className="chat">
        <Sidebar />
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