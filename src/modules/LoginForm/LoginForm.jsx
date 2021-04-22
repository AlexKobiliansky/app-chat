import React from 'react';
import {Form, Input} from "antd";
import Button from "../../components/Button/Button";
import {Link} from 'react-router-dom';
import Block from "../../components/Block/Block";

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Block>
      <div className="auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>

      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            {min: 4, message: 'Должно быть минимум 4 символа'}
          ]}
        >
          <Input placeholder="Имя пользователя"/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Пароль"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">Войти в аккаунт</Button>
        </Form.Item>
        <Link className="auth__register-link" to="/register">Зарегистрироваться</Link>
      </Form>
    </Block>

  );
};

export default LoginForm;