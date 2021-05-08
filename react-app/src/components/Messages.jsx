import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import AppBar from '@material-ui/core/AppBar';
import GifIcon from '@material-ui/icons/Gif';
import "../style/Messages.css"


import axios from "axios";
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


/*
 * @Functionalities
 * @Author Bartosz Szlęzak
 * @Author Grzegorz Szydło
 * @Author Paweł Szydło
 * @Author Łukasz Stolarz
 * @Version 2.0
 * @Since 2021-04-30
 * */
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '100vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '68vh',
        overflowY: 'auto'
    },

    listScroll: {
        height: "100%",
        overflow: "auto"
    }
});

const api = axios.create({
    baseURL: `http://localhost:8080`
})

let stompClient = null;
let receiverId = 0;

const Messages = () => {

    const auth = useSelector(state => state.auth)
    const history = useHistory()
    if (!auth.login)
        history.push('/');

    const classes = useStyles();

    let idActualUser = parseInt(localStorage.getItem("id"));
    console.log("ID UZYTKOWNIKA "+idActualUser);
    const [conversation, setConversation] = useState({'is': false});

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({
        content: "",
        sender: 0,
        receiver: 0
    })

    const [actualMessage, setActualMessage] = useState([]);

    useEffect(() => {
        api.get('/api/users').then(response => response.data)
            .then(data => setUsers(data))

    }, []);

    const connect = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);

    }

    const onConnected = () => {

        stompClient.subscribe('/user/' + idActualUser + "/reply", onMessageReceived);

    }
    const onMessageReceived = (payload) => {
        getMessage(receiverId);
        console.log(actualMessage)
    }

    const sendMessage = () => {

        if (stompClient) {
            stompClient.send("/app/send", {}, JSON.stringify(message));
            // localMessage.push(message);
            // console.log(localMessage)
            setMessage({...message, content: ""});

            setTimeout(() => {
                getMessage(receiverId);
                let a;
                console.log(a);
                console.log(actualMessage)
            }, 500);
        }
    }

    const handleClick = user => {
        receiverId = user.id;
        setConversation({'is': true});
        setMessage({...message, sender: idActualUser, receiver: receiverId})
        setUserDetails({
            username: user.username,
            surname: user.surname
        })
        getMessage(receiverId);
        connect();
    };

    const onError = (error) => {
        console.log("error");
    }

    const getMessage = receiverId => {
        api.get('/messages?sender=' + idActualUser + "&receiver=" + receiverId).then(response => response.data)
            .then(data => {
                    setActualMessage(data)
                }
            )

        console.log("receiver " + receiverId);
    }

    const [userDetails, setUserDetails] = useState({
        username: "",
        surname: ""
    })

    return (
        <div className={"new-messages"}>
            <Grid container component={Paper} className={classes.chatSection}>

                <Grid item xs={3} className={classes.borderRight500}>
                    <AppBar position="static">
                        <div className="navList">
                                <Typography variant="h6">
                                    Czat
                                </Typography>
                            <input id="search" className="searchInput" placeholder="Search" autoComplete="off" />
                        </div>
                    </AppBar>

                    <List className={classes.listScroll}>
                        {users.map(user => (
                            <ListItem button onClick={() => handleClick(user)} key={user.id} className="userList">
                                    <Avatar alt={user.username}
                                            src="/broken-image.jpg"/>
                                <a   className="UserDescription">
                                    {user.username + " " +user.surname}
                                </a>

                            </ListItem>
                        ))}
                    </List>
                </Grid>


                {conversation.is ? (
                    <Grid item xs={9}>
                        <AppBar position="static">
                            <div className="navList">
                                    <Typography variant="h6">
                                        {userDetails.username + " " + userDetails.surname}
                                    </Typography>
                            </div>
                        </AppBar>

                        <List className={classes.messageArea}>
                            {actualMessage.map((messR) => (

                                (messR.sender !== idActualUser) ? (
                                    <ListItem key={messR.id}>
                                        <div className="photo">
                                            <Avatar alt="User"
                                                    src="/broken-image.jpg"/>
                                        </div>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" primary={messR.content}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" secondary={messR.date.split("T")[0] + " " + messR.date.split("T")[1].split(".")[0]}/>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ) : (
                                    <ListItem key={messR.id}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" primary={messR.content}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" secondary={messR.date.split("T")[0] + " " + messR.date.split("T")[1].split(".")[0]}/>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            ))}
                        </List>

                        <div className='bottom-bar'>
                            <Grid container style={{padding: '20px'}}>
                                <Grid item xs={11}>
                                    <TextField id="outlined-basic-email"
                                               label="Napisz nową wiadomość..."
                                               onChange={e => setMessage({
                                                   ...message,
                                                   content: e.target.value
                                               })}
                                               value={message.content}
                                               onKeyPress={event => {
                                                   if (event.key === 'Enter') {
                                                       sendMessage();
                                                   }
                                               }}
                                               required
                                               fullWidth/>
                                    <button><WallpaperIcon/></button>
                                </Grid>
                                <Grid xs={1} align="right">
                                    <button onClick={sendMessage} ><SendIcon/></button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                ) : null}
            </Grid>
        </div>

    );
}

export default Messages;
