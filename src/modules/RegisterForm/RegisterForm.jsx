import React, {useState} from 'react';
import Block from "../../components/Block/Block";
import {Form, Input} from "antd";
import Button from "../../components/Button/Button";
import {Link} from "react-router-dom";
import {InfoCircleTwoTone} from "@ant-design/icons";



const RegisterForm = () => {
  const [success, setSuccess] = useState(true)


  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div className="auth__top">
        <h2>Регистрация</h2>
        <p>Для входа в чат Вам нужно зарегистрироваться</p>
      </div>

      <Block>
        {!success
          ? <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
          >

            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Email"/>
            </Form.Item>

            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Имя пользователя"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Пароль"/>
            </Form.Item>

            <Form.Item
              name="repeatPassword"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Повторите пароль"/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" size="large">Зарегистрироваться</Button>
            </Form.Item>
            <Link className="auth__register-link" to="/login">Войти в аккаунт</Link>
          </Form>
          : <div className="auth__success-block">

            <div><InfoCircleTwoTone style={{fontSize: "50px"}}/></div>
            <h3>Подтвердите свой аккаунт</h3>
            <p>На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта</p>
          </div>

        }

      </Block>
    </div>
  );
};

export default RegisterForm;