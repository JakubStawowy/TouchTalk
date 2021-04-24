import React from "react";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Route, NavLink} from "react-router-dom";
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

import "./Home.css";
import { useSelector} from "react-redux";
import {useHistory} from "react-router-dom";



const Home = () => {
    const auth = useSelector(state => state.auth)
    const history = useHistory()
    if (!auth.login)
        history.push('/');

    return (
        <div className="container">

            <AppBar >
                <div className='right-navbar'>
                    <div className="navList">
                        <div className="navList2">
                            <div className='photo1'>
                                <Avatar alt="User1" src="https://material-ui.com/static/images/avatar/3.jpg"/>
                            </div>
                            <Typography variant="h6">
                                {auth.user.user.userDetails.name} {auth.user.user.userDetails.surname}
                            </Typography>
                        </div>


                        <div>
                            <button><PersonAddSharpIcon/></button>
                            <button><VideocamSharpIcon/></button>
                            <button><PhoneSharpIcon/></button>
                        </div>
                    </div>
                </div>
            </AppBar>

            <Grid className=" container homeContainer">
                <Grid item xs={2}>
                    <Divider orientation='horizontal'/>
                    <div className='navbar-left'>
                        <List className="menu">
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


                <Grid item xs={10} > 
                    <Route path="/notifications" component={Notifications}/>
                    <Route path="/messages" component={Messages}/>
                    <Route path="/tasks" component={Tasks}/>
                    <Route path="/calls" component={Calls}/>
                    <Route path="/teams" component={Teams}/>



                </Grid>
            </Grid>




        </div>
    );
};

export default Home;

