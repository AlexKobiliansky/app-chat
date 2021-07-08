import Auth from "./pages/Auth/Auth";
import {Route, Switch} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home/Home';
import {useDispatch} from "react-redux";
import actions from "./redux/actions/users";



function App() {
  const dispatch = useDispatch();

  dispatch(actions.fetchUserData());

  return (
    <div className="wrapper">
      <Switch>
        <Route exact path={["/login", "/register", "/register/verify"]} component={Auth} />
        <Route exact path={["/", "/dialog/:id"]} component={Home} />
      </Switch>
    </div>
  );
}

export default App;
