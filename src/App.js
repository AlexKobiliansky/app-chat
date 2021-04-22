import Auth from "./pages/Auth/Auth";
import {Route} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="wrapper">
      {/*<Route exact path={["/", "/login"]} component={Auth} />*/}
      <Route exact path="/im" component={Home} />
      <Auth />
    </div>
  );
}

export default App;
