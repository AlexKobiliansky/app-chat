import React, {useState} from 'react';
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import FormOutlined from "@ant-design/icons/FormOutlined";
import Dialogs from "../Dialogs/Dialogs";
import {useSelector} from "react-redux";
import {Modal, Select, Input, Button, Form} from 'antd';
import usersApi from '../../api/users';
import dialogsApi from '../../api/dialogs';
import './Sidebar.sass'

const {Option} = Select;
const {TextArea} = Input;

const Sidebar = () => {
  const user = useSelector(({users}) => users.data);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [messageText, setMessageText] = useState('');


  const options = users.map(user => <Option key={user._id}>{user.fullName}</Option>);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onChangeInput = (value) => {
    setInputValue(value)
  }
  const onSearchUser = (value) => {
    setIsLoading(true)
    usersApi.findUsers(value).then(({data}) => {
      setUsers(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    })
  }

  const onSelectUser = (userId) => {
    setSelectedUserId(userId)
  }

  const onAddDialog = () => {
    setIsLoading(true)

    dialogsApi
      .create({
        partnerId: selectedUserId,
        text: messageText
      })
      .then(closeModal)
      .catch(() => {
        setIsLoading(false);
      });
  }

  const onChangeTextArea = (e) => {
    console.log(selectedUserId)
    setMessageText(e.target.value)
  }

  return (
    <div className="chat__sidebar">
      <div className="chat__sidebar-header">
        <div>
          <TeamOutlined/>
          <span>Список диалогов</span>
        </div>
        <FormOutlined onClick={showModal}/>
      </div>

      <div className="chat__sidebar-dialogs">
        <Dialogs
          userId={user?._id}
        />
      </div>

      <Modal
        title="Создать диалог"
        visible={isModalVisible}
        confirmLoading={isLoading}
        onCancel={closeModal}
        footer={[
          <Button
            key="back"
            onClick={closeModal}
          >
            Отмена
          </Button>,
          <Button
            disabled={!messageText}
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onAddDialog}
          >
            Создать
          </Button>
        ]}
      >
        <Form className="add-dialog-form">
          <Form.Item label="Введите имя пользователя или email">
            <Select
              value={inputValue}
              onSearch={onSearchUser}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              placeholder='Найти пользователя...'
              style={{width: '100%', marginBottom: '15px'}}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={false}
              notFoundContent={null}
              showSearch
            >
              {options}
            </Select>
          </Form.Item>

          {selectedUserId && <Form.Item label="Введите текст сообщения">
            <TextArea
              autoSize={{minRows: 2, maxRows: 10}}
              onChange={onChangeTextArea}
              value={messageText}
            />
          </Form.Item>}
        </Form>


      </Modal>
    </div>
  );
};

export default Sidebar;