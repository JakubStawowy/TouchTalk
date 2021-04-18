import React from "react";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Route, NavLink, HashRouter} from "react-router-dom";
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
//import {isMobile} from 'react-device-detect';
import MessageIcon from '@material-ui/icons/Message';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Notifications from "./Notifications";
import Messages from "./Messages";
import Tasks from "./Tasks";
import Calls from "./Calls";
import Teams from "./Teams";
import {  } from "module";
import "./Home.css";

function detectMob() {
  return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
}

const Home = () => {
  let menu = {};
  let  menuWidth = 2;
  let  content = {};
  let  contentWidth = 10;
  if (detectMob()){
    menu ={
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    };
    menuWidth = 12;
    content = {
      display: 'flex',
      flexDirection: 'column-reverse',
      padding: 0,
    };
    contentWidth = 12;
  }
  return (
    <HashRouter>
      <section>
        <Grid container fullWidth fullHeight style={content}>
          <Grid item xs={menuWidth}>
          <div class='navbar-left'>
            <List style={menu}>
              <ListItem key="notifications">
                <ListItemIcon>
                  <NotificationsActiveIcon/>
                </ListItemIcon>
                <NavLink to='/notifications'>Notifications</NavLink>
              </ListItem>
    
              <ListItem key="messages">
                <ListItemIcon>
                   <MessageIcon/>
                </ListItemIcon>
                <NavLink to='/messages'>Messages</NavLink>
              </ListItem>
    
              <ListItem key="tasks">
                <ListItemIcon>
                  <FormatListBulletedIcon/>
                </ListItemIcon>
                <NavLink to='/tasks'>Tasks</NavLink>
              </ListItem>
    
              <ListItem key="calls">
                <ListItemIcon>
                  <PhoneSharpIcon/>
                </ListItemIcon>
                <NavLink to='/calls'>Calls</NavLink>
              </ListItem>
    
              <ListItem key="teams">
                <ListItemIcon>
                  <GroupAddIcon/>
                </ListItemIcon>
                <NavLink to='/teams'>Teams</NavLink>
              </ListItem>
            </List>
           </div>
          </Grid>
          <Grid item xs={contentWidth}>
            <Route path="/notifications" component={Notifications}/>
            <Route path="/messages" component={Messages}/>
            <Route path="/tasks" component={Tasks}/>
            <Route path="/calls" component={Calls}/>
            <Route path="/teams" component={Teams}/>
          </Grid>
        </Grid>
      </section>
    </HashRouter>
  );
};

export default Home;
