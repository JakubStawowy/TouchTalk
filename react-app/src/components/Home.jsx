
import React from "react";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Route, NavLink} from "react-router-dom";
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import {isMobile} from 'react-device-detect';
import MessageIcon from '@material-ui/icons/Message';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Notifications from "./Notifications";
import Divider from '@material-ui/core/Divider';
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
      <section>
        <AppBar position="static">
          <div class='right-navbar'>
            <Toolbar >
              <div class='photo1'>
                <Avatar alt="User1" src="https://material-ui.com/static/images/avatar/3.jpg" />
              </div>
               <Typography variant="h6" >
                Alicja Kowalczyk
              </Typography>
              <div class='talk'>
                <button><PersonAddSharpIcon/></button>
                <button><VideocamSharpIcon/></button>
                <button><PhoneSharpIcon/></button>
              </div>
            </Toolbar>
          </div>
      </AppBar>
        <Grid container fullWidth fullHeight style={content}>
          <Grid item xs={menuWidth}>
              <Divider orientation='horizontal'></Divider>
          <div class='navbar-left'>
            <List style={menu}>
              <ListItem key="notifications">
                <ListItemIcon>
                  <NotificationsActiveIcon/>
                </ListItemIcon>
                <NavLink to='/notifications'>Aktualności</NavLink>
              </ListItem>
    
              <ListItem key="messages">
                <ListItemIcon>
                   <MessageIcon/>
                </ListItemIcon>
                <NavLink to='/messages'>Wiadomości</NavLink>
              </ListItem>
    
              <ListItem key="tasks">
                <ListItemIcon>
                  <FormatListBulletedIcon/>
                </ListItemIcon>
                <NavLink to='/tasks'>Zadania</NavLink>
              </ListItem>
    
              <ListItem key="calls">
                <ListItemIcon>
                  <PhoneSharpIcon/>
                </ListItemIcon>
                <NavLink to='/calls'>Rozmowy</NavLink>
              </ListItem>
    
              <ListItem key="teams">
                <ListItemIcon>
                  <GroupAddIcon/>
                </ListItemIcon>
                <NavLink to='/teams'>Zespoły</NavLink>
              </ListItem>
              
              <ListItem key="log_out">
                <ListItemIcon>
                  <ExitToAppIcon/>
                </ListItemIcon>
                <NavLink to='/log_out'>Wyloguj</NavLink>
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
  );
};

export default Home;

