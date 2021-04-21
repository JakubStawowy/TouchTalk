import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "../components/Signin.jsx";
import Signup from "../components/Signup.jsx";
import Home from "../components/Home.jsx";

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Signin} />
      <Route path='/signup' component={Signup} />
      <Route path='/home' component={Home} />
    </Switch>
  );
};

export default Routes;
