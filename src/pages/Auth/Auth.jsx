import React from 'react';
import './Auth.sass';
import LoginForm from "../../modules/LoginForm/LoginForm";
import {Route} from 'react-router-dom'
import RegisterForm from "../../modules/RegisterForm/RegisterForm";


const Auth = () => {

  return (
    <section className="auth">
      <div className="auth__content">
        <Route exact path={["/", "/login"]} component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
      </div>
    </section>
  );
}



export default Auth;