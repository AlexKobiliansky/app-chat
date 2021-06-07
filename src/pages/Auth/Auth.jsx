import React from 'react';
import './Auth.sass';
import LoginForm from "../../modules/LoginForm/LoginForm";
import {Route} from 'react-router-dom'
import RegisterForm from "../../modules/RegisterForm/RegisterForm";
import CheckEmailInfo from "../../components/CheckEmailInfo/CheckEmailInfo";


const Auth = () => {

  return (
    <section className="auth">
      <div className="auth__content">
        <Route exact path={["/", "/login"]} component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route path="/register/verify" component={CheckEmailInfo} />
      </div>
    </section>
  );
}



export default Auth;