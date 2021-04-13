import React from "react";
import { Route, NavLink, HashRouter} from "react-router-dom";
import Notifications from "./Notifications";
import Messages from "./Messages";
import Tasks from "./Tasks";
import Calls from "./Calls";
import Teams from "./Teams";
import {  } from "module";
import "./Home.css";

const Home = () => {
  return (
    <HashRouter>
      <section>
        <div className='upper-bar'>
          <img src='' className='logo'></img>
          <div className='profile-picture'></div>
        </div>
        <div className='content'>
          <div className='side-bar'>
            <ul className='menu'>
              <li><NavLink to='/notifications'>Notifications</NavLink></li>
              <li><NavLink to='/messages'>Messages</NavLink></li>
              <li><NavLink to='/tasks'>Tasks</NavLink></li>
              <li><NavLink to='/calls'>Calls</NavLink></li>
              <li><NavLink to='/teams'>Teams</NavLink></li>
            </ul>
          </div>
          <div className='page-content'>
            <Route path="/notifications" component={Notifications}/>
            <Route path="/messages" component={Messages}/>
            <Route path="/tasks" component={Tasks}/>
            <Route path="/calls" component={Calls}/>
            <Route path="/teams" component={Teams}/>
          </div>
        </div>
      </section>
    </HashRouter>
  );
};

export default Home;
