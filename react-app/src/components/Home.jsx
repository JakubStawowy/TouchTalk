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
import Notifications from "./Notifications";
import Messages from "./Messages";
import Tasks from "./Tasks";
import Calls from "./Calls";
import Teams from "./Teams";
import {} from "module";
import "../style/Home.css";

import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUserDetails} from "../actions/getUserDetails";
import {signout} from "../actions/auth";


function detectMob() {
    return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
}

const Home = () => {

    const auth = useSelector(state => state.auth)
    const history = useHistory()
    const dispatch = useDispatch();
    if (!auth.login)
        history.push('/');

    const [userDetails, setUserDetails] = useState(
        {
            username: "",
            surname: ""
        }
    );

    const handleLogout = () => {
        dispatch(signout()).then(() => {
            history.replace("/");
        });
    }

    const handleMessage = () => {
        history.push("/message");
    }

    useEffect(() => {
        getUserDetails().then(response => {
            // setUserDetails(response.data.userDetails);
            setUserDetails(response.data);
        })
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
            {/*<AppBar position="relative">*/}
            {/*    <div class='right-navbar'>*/}
            {/*        <div className="navList">*/}
            {/*            <div className="navList2">*/}
            {/*                <div class='photo1'>*/}
            {/*                    <Avatar alt="User1" src="/broken-image.jpg" />*/}
            {/*                </div>*/}
            {/*                <Typography variant="h6" >*/}
            {/*                    {userDetails.username} {userDetails.surname}*/}
            {/*                </Typography>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</AppBar>*/}

            {/*<Grid container style={content}>*/}
            <Grid container className={"new-container"}>
                <Grid item xs={2}>

                    <div className="navList">
                            <div class='photo1'>
                                <Avatar alt="User1" src="/broken-image.jpg"/>
                            </div>
                            <Typography variant="h6">
                                {userDetails.username} {userDetails.surname}
                            </Typography>
                    </div>

                    <div class='navbar-left'>
                        <List style={menu}>
                            <ListItem button key="notifications">
                                <ListItemIcon>
                                    <NotificationsActiveIcon/>
                                </ListItemIcon>
                                <NavLink to='/notifications'>Aktualności</NavLink>
                            </ListItem>

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

                            <ListItem button key="calls">
                                <ListItemIcon>
                                    <PhoneSharpIcon/>
                                </ListItemIcon>
                                <NavLink to='/calls'>Rozmowy</NavLink>
                            </ListItem>

                            <ListItem button key="teams">
                                <ListItemIcon>
                                    <GroupAddIcon/>
                                </ListItemIcon>
                                <NavLink to='/teams'>Zespoły</NavLink>
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
                </Grid>
            </Grid>
        </section>
    );

};

export default Home;
