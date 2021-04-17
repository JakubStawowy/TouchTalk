import React from "react";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Route, NavLink, HashRouter} from "react-router-dom";
//import {isMobile} from 'react-device-detect';
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
        <AppBar position="static">
            <Toolbar >
              <Avatar alt="User1" src="https://material-ui.com/static/images/avatar/1.jpg" />
              <Typography variant="h6" >
                User
              </Typography>
            </Toolbar>
        </AppBar>
        <Grid container fullWidth fullHeight style={content}>
          <Grid item xs={menuWidth}>
            <List style={menu}>
              <ListItem key="notifications">
                <ListItemIcon>

                </ListItemIcon>
                <NavLink to='/notifications'>Notifications</NavLink>
              </ListItem>
              <ListItem key="messages">
                <ListItemIcon>
                  
                </ListItemIcon>
                <NavLink to='/messages'>Messages</NavLink>
              </ListItem>
              <ListItem key="tasks">
                <ListItemIcon>
                  
                </ListItemIcon>
                <NavLink to='/tasks'>Tasks</NavLink>
              </ListItem>
              <ListItem key="calls">
                <ListItemIcon>
                  
                </ListItemIcon>
                <NavLink to='/calls'>Calls</NavLink>
              </ListItem>
              <ListItem key="teams">
                <ListItemIcon>
                  
                </ListItemIcon>
                <NavLink to='/teams'>Teams</NavLink>
              </ListItem>
            </List>
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
