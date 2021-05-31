import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Route, NavLink} from "react-router-dom";
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MessageIcon from '@material-ui/icons/Message';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import SettingsIcon from '@material-ui/icons/Settings';

import Notifications from "./Notifications";
import Messages from "./Messages";
import Tasks from "./task/Tasks";
import Calls from "./Calls";
import Teams from "./Teams";
import AccountSettings from './accountSettings/AccountSettings.jsx';
import {} from "module";
import "../style/Home.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUserDetails} from "../actions/getUserDetails";
import {signout} from "../actions/auth";
import {handleNetworkError} from "../actions/handleNetworkError";


function detectMob() {
    return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
}

const Home = () => {

    const auth = useSelector(state => state.auth)
    const userData = useSelector(state => state.auth.userData)
    const history = useHistory()
    const dispatch = useDispatch();
    if (!auth.login)
        history.push('/');


    const handleLogout = () => {
        dispatch(signout()).then(() => {
            history.replace("/");
        }).catch((error) => handleNetworkError(error, () => history.replace("/")));;
    }

    const handleMessage = () => {
        history.push("/message");
    }

    useEffect(() => {
        getUserDetails().then(res=>{
            dispatch({type: 'USERDATA', payload: res})
        }).catch((error) => {
            handleNetworkError(error, () => history.push("/"));
        });
    }, []);

    let menu = {};
    let menuWidth = 2;
    let content = {};
    let contentWidth = 10;
    if (detectMob()) {
        menu = {
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
        };
        menuWidth = 12;
        content = {
            display: 'flex',
            flexDirection: 'column-reverse',
            padding: 0
        };
        contentWidth = 12;
    }
    return (
        <section>

            <Grid container className={"new-container"}>
                <Grid item xs={2}>

                    <div className="navList">
                        <div className='photo1'>
                            <Avatar alt={userData ? userData.username : null}
                                    src={userData ? userData.image : "/broken-image.jpg"}/>

                        </div>
                        <Typography variant="h6">
                            {userData ? userData.username : null} {userData ? userData.surname : null}
                        </Typography>
                    </div>

                    <div class='navbar-left'>
                        <List style={menu}>

                            <ListItem button key="messages">
                                <ListItemIcon>
                                    <MessageIcon/>
                                </ListItemIcon>
                                <NavLink to='/messages'>Wiadomości</NavLink>
                            </ListItem>

                            <ListItem button key="tasks">
                                <ListItemIcon>
                                    <FormatListBulletedIcon/>
                                </ListItemIcon>
                                <NavLink to='/tasks'>Zadania</NavLink>
                            </ListItem>



                            <ListItem button key="teams">
                                <ListItemIcon>
                                    <GroupAddIcon/>
                                </ListItemIcon>
                                <NavLink to='/teams'>Zespoły</NavLink>
                            </ListItem>

                            <ListItem button key="account">
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <NavLink to='/account'>Ustawienia</NavLink>
                            </ListItem>

                            <ListItem button key="log_out" onClick={handleLogout}>
                                <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <NavLink to='/home'>Wyloguj</NavLink>
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
                    <Route path="/account" component={AccountSettings}/>
                </Grid>
            </Grid>
        </section>
    );

};

export default Home;
