import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "../components/Signin.jsx";
import Signup from "../components/Signup.jsx";
import Home from "../components/Home.jsx";
import Logout from "../components/Logout.jsx";

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Signin} />
      <Route path='/signup' component={Signup} />

      <Route path='/messages' component={Home} />
      <Route path='/notifications' component={Home} />
      <Route path='/tasks' component={Home} />
      <Route path='/calls' component={Home} />
      <Route path='/teams' component={Home} />
      <Route path='/logout' component={Logout} />

      <Route path='/home' component={Home} />

    </Switch>
  );
};

export default Routes;
