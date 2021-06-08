import Auth from "./pages/Auth/Auth";
import {Route, Switch} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home/Home';


function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path={["/", "/login", "/register", "/register/verify"]} component={Auth} />
        <Route exact path={["/im", "/dialog/:id"]} component={Home} />
      </Switch>
    </div>
  );
}

export default App;
