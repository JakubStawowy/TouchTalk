import React, {useEffect, useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import SendIcon from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import EmailIcon from '@material-ui/icons/Email';
import MoodIcon from '@material-ui/icons/Mood';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import GifIcon from '@material-ui/icons/Gif';

import "./Messages.css"



import axios from "axios";
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


const api = axios.create({
    baseURL: `http://localhost:8080`
})



let stompClient = null;
let receiverId=0;
const Messages = () => {
    const auth = useSelector(state=>state.auth)
    const history = useHistory()
    if(!auth.login)
        history.push('/');

    let idActualUser = auth.user.user.id;
    let usersWidth = 3;
    let conversationWidth = 8;
    const [conversation, setConversation] = useState({'is': false});



    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({
        type: "",
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
    }


    const sendMessage = () => {

        if (stompClient) {
            stompClient.send("/app/sendPrivateMessage", {}, JSON.stringify(message));
           setMessage({...message, content: ""});

            setTimeout(()=>{getMessage(receiverId);
                let a;
                console.log(a);
            }, 500);
        }
        }


    const handleClick = id => {
        receiverId=id;
       console.log(receiverId);
        setConversation({'is': true});
        setMessage({...message, sender: idActualUser, receiver: receiverId})
        getMessage(receiverId);
        connect();
    };

    const onError = (error) => {
        console.log("error");
    }


    const getMessage = receiverId => {
        api.get('/messagelist/'+idActualUser+"/"+receiverId).then(response => response.data)
            .then(data => {

                    setActualMessage(data)
                }
            )
        console.log("receiver" + receiverId);
    }
    return (
        <div className='size'>
            <Grid container component={Paper} >
                {conversation.is ? null : (
                    <Grid item xs={usersWidth}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                Chat
                            </Typography>
                            <ae>
                                <button><ExpandMoreIcon/></button>
                            </ae>
                            <div className='search'>
                                <button><SearchIcon/></button>
                            </div>
                            {/* <InputBase
                                    inputProps={{ 'aria-label': 'search' }}
                                /> */}

                            {/* <div class="sea">
                                <InputBase placeholder="Search…"></InputBase>
                            </div> */}
                            <p>
                                <button><EmailIcon/></button>
                            </p>
                        </Toolbar>
                    </AppBar>
                    <List>

                        {users.map(user => (
                            <ListItem button onClick={() =>handleClick(user.id)} key={user.id}>

                                <ListItemIcon>
                                        <Avatar alt={user.userDetails.name}
                                                src="https://material-ui.com/static/images/avatar/1.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={user.userDetails.name}/>
                                <c1/>
                                <ListItemText secondary="online" align="right"/>

                            </ListItem>

                        ))}

                    </List>
                </Grid>)}



                {conversation.is ? (

                    <Grid className=" messageList" item xs={conversationWidth}>
                        <List className='mess'>

                            {actualMessage.map((messR) => (
                                (messR.sender===idActualUser)?(
                                    <ListItem id={messR.id} alignItems="center" className="right"  >
                                        <div className='photo'>
                                            <Avatar alt="User"
                                                    src="https://material-ui.com/static/images/avatar/3.jpg"/>
                                        </div>
                                        <div>
                                            <Grid container>
                                                <div className='message'>
                                                    <Grid item xs={12}>
                                                        <ListItemText align="right" primary={messR.content} />
                                                    </Grid>
                                                </div>
                                                <Grid item xs={12}>
                                                    <div className='date'>
                                                        <ListItemText align="left" secondary={messR.dateTime}/>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </ListItem>

                                ):(
                                    <ListItem id={messR.id} alignItems="flex-start" className="left">

                                        <div>
                                            <Grid container>
                                                <div className='message'>
                                                    <Grid item xs={12}>
                                                        <ListItemText align="left" primary={messR.content}/>
                                                    </Grid>
                                                </div>
                                                <Grid item xs={12}>
                                                    <div className='date'>
                                                        <ListItemText align="left" secondary={messR.dateTime}/>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>


                                        <div className='photo'>
                                            <Avatar alt="User"
                                                    src="https://material-ui.com/static/images/avatar/3.jpg"/>
                                        </div>
                                    </ListItem>


                                    )

                            ))}

                        </List>
                        <Grid container>
                            <div className='type'>
                                <Grid item xs={11}>
                                    <TextField id="Message" label="Napisz nową wiadomość..."
                                               onChange={e => setMessage({
                                                   ...message,
                                                   content: e.target.value,
                                                   type: "CHAT"
                                               })}
                                               value={message.content}
                                               onKeyPress={event => {
                                                   if (event.key === 'Enter') {
                                                       sendMessage();
                                                   }
                                               }}


                                    />
                                </Grid>
                            </div>
                            <k>
                                <button><TextFieldsIcon/></button>
                                <button><WallpaperIcon/></button>
                                <button><MoodIcon/></button>
                                <button><GifIcon/></button>
                            </k>
                            <div className='add'>
                                <Grid xs={1} align="right">
                                    <div className='right'>
                                        <button onClick={sendMessage}><SendIcon/></button>
                                    </div>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                ) : (


                    <Grid item xs={conversationWidth}>
                        <div className='mess'>

                            <p>wybierz uzytkownika</p>
                            <p>wybierz uzytkownika</p>
                            <p>wybierz uzytkownika</p>
                            <p>wybierz uzytkownika</p>
                            <p>wybierz uzytkownika</p>
                        </div>
                    </Grid>


                )}
            </Grid>
        </div>
    );
};

export default Messages;
