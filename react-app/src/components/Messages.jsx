import React, {useEffect, useRef, useState} from 'react';
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
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import AppBar from '@material-ui/core/AppBar';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
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
        height: '73vh',
        overflowY: 'auto'
    },

    listScroll: {
        overflow: "auto"
    },

    picture: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
    const [conversation, setConversation] = useState({'is': false});

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({
        content: "",
        sender: 0,
        receiver: 0,
        imageURL: ""
    })

    const [actualMessage, setActualMessage] = useState([]);

    const [image, setImage] = useState("");
    const [inputHolder] = useState();

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
            setMessage({...message, content: "", imageURL: ""});
            setImage("")


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
        api.get('/messages?sender=' + idActualUser + "&receiver=" + receiverId)
            .then(response => {

                    Promise.all(response.data.map(mess =>
                        api.get("/imageMess/" + mess.id)
                            .then(resp => resp.data)
                            .then(data => {

                                return {mess, data};
                            })
                    )).then(res => {
                        res.map(m => m.mess.imageURL = m.data);
                        setActualMessage(response.data)
                })
            })
    }


    const [userDetails, setUserDetails] = useState({
        username: "",
        surname: ""
    })

    const [searchText, setSearchText] = useState("");

    function search (users){
        const userKey =["username"];

        let filtr =users.filter((user) =>
            userKey.some((key)=> user[key].toString().toLowerCase().indexOf(searchText.toString()) > -1));
        return filtr;
    }

    let file ="";
    const addNewPhoto = async (event) =>{

        file = event.target.files[0];


        const resp = (file) =>new Promise((resolve, reject) =>{
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })

        const dataURL = await resp(file);
        setImage(dataURL);
        setMessage({...message, imageURL: dataURL});


    }

    return (
        <div className={"new-messages"}>
            <Grid container component={Paper} className={classes.chatSection}>

                <Grid item xs={3} className={classes.borderRight500}>
                    <AppBar position="static">
                        <div className="navList">
                                <Typography variant="h6">
                                    Czat
                                </Typography>
                            <input id="search"
                                   className="searchInput"
                                   placeholder="Search"
                                   onChange={(e) => setSearchText(e.target.value)}
                                   autoComplete="off" />
                        </div>
                    </AppBar>

                    <List className={classes.listScroll}>
                        {search(users).map(user => (
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

                                                {(messR.imageURL!=="Empty")?(
                                                    <ListItem>
                                                        <Grid container>
                                                            <Grid item xs={12} className={classes.picture}>
                                                                <div class="pictureContainer">
                                                                    <img className="picture" src={messR.imageURL} alt="/broken-image.jpg"/>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                ):null}





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


                                                {(messR.imageURL!=="Empty")?(
                                                    <ListItem>
                                                        <Grid container>
                                                            <Grid item xs={12} className={classes.picture}>
                                                                <div class="pictureContainer">
                                                                    <img className="picture" src={messR.imageURL} alt="/broken-image.jpg"/>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                ):null}



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
                            {image ?
                            (<div class="pictureContainerMini">
                                <img class="pictureMini" src={image}/>
                            </div>) : null}

                        <div className='bottom-bar'>
                            <Grid container>

                                <Grid item xs={11}>
                                    <TextField id="outlined-basic messageInput"
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
                                               autoComplete="off"
                                               fullWidth/>

                                        <input accept="image/*"
                                               id="icon-button-file"
                                               onChange={(e) => addNewPhoto(e)}
                                               type="file"
                                               style={{ display: 'none' }} />
                                        <label htmlFor="icon-button-file">
                                                <WallpaperIcon />
                                        </label>


                                </Grid>
                                <Grid xs={1} align="right" className="sendButtonIcon">
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
