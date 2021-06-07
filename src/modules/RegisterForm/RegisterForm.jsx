import React, {useState} from 'react';
import Block from "../../components/Block/Block";
import {Form, Input} from "antd";
import Button from "../../components/Button/Button";
import {Link} from "react-router-dom";
import {InfoCircleTwoTone} from "@ant-design/icons";
import actions from "../../redux/actions/users";
import {useDispatch} from "react-redux";



const RegisterForm = () => {
  const dispatch = useDispatch();
  const [success] = useState(false);

  const onFinish = (values) => {
    dispatch(actions.fetchUserRegister(values)).then(() => {
      // history.push("/im");
      console.log('Success:', values);
    })
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
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder="Email"/>
            </Form.Item>

            <Form.Item
              name="fullName"
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

            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Повторите пароль"/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" size="large" htmlType="submit">Зарегистрироваться</Button>
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