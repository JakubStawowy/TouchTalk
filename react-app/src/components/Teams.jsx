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
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import AppBar from '@material-ui/core/AppBar';
import "../style/Messages.css"


import axios from "axios";
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Add} from "@material-ui/icons";
import AddGroup from "./AddGroup";
import JoinGroup from "./JoinGroup";


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
        height: '100%'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '65vh',
        overflowY: 'auto'
    },

    listScroll: {
        // height: '71vh',
        overflow: "auto"
    }
});

const api = axios.create({
    baseURL: `http://localhost:8080/api`
})

let stompClient = null;
let groupId = 0;

const Teams = () => {

    const auth = useSelector(state => state.auth)
    const history = useHistory()
    if (!auth.login)
        history.push('/');

    const classes = useStyles();

    let idActualUser = parseInt(localStorage.getItem("id"));

    const [conversation, setConversation] = useState({'is': false});


    const [message, setMessage] = useState({
        content: "",
        sender: 0,
        receiver: 0
    })

    const [actualMessage, setActualMessage] = useState([]);


    const connect = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);

    }

    const onConnected = () => {

        stompClient.subscribe('/user/' + idActualUser + "/reply", onMessageReceived);

    }
    const onMessageReceived = (payload) => {
        getMessage(groupId);
        console.log(actualMessage)
    }

    const sendMessage = () => {

        if (stompClient) {
            stompClient.send("/app/sendGroupMessage", {}, JSON.stringify(message));
            // localMessage.push(message);
            // console.log(localMessage)
            setMessage({...message, content: ""});

            setTimeout(() => {
                getMessage(groupId);
                let a;
                console.log(a);
                console.log(actualMessage)
            }, 500);
        }
    }


    const onError = (error) => {
        console.log("error");
    }

    const getMessage = groupId => {
        api.get('/messgrouplist/' + groupId).then(response => response.data)
            .then(data => {
                    setActualMessage(data)
                }
            )

        console.log("receiver " + groupId);
    }


    const handleClick = group => {
        groupId = group.id;
        console.log(group);
        setConversation({'is': true});
        setMessage({...message, sender: idActualUser, receiver: groupId})
        setGroupDetails({
            name: group.name,
            code: group.code
        })
        getMessage(groupId);
        connect();
    };

    useEffect(() => {
        api.get(`/groups?id=${idActualUser}`).then(response => response.data)
            .then(data => setGroups(data))
    }, []);

    const [groups, setGroups] = useState([]);

    const [groupDetails, setGroupDetails] = useState({
        name: "",
        code: ""
    })

    const [addGroupStatus, setAddGroupStatus] = useState("false");

    const addGroup = () => {
        setAddGroupStatus("true");
    }

    return (
        <div className={"new-messages"}>
            <Grid container component={Paper} className={classes.chatSection}>

                <Grid item xs={3} className={classes.borderRight500}>
                    <AppBar position="static">
                        <div className="navList3">
                            <div className="navList2">
                                <Typography variant="h6">
                                    Czat
                                </Typography>
                            </div>
                            <div align="flex-end">
                                <button onClick={addGroup}><Add/></button>
                            </div>
                        </div>
                    </AppBar>
                    <JoinGroup/>
                    {addGroupStatus === "true" ? <AddGroup status={setAddGroupStatus}/> : null}

                    <List className={classes.listScroll}>
                        {groups.map(group => (
                            <ListItem button onClick={() => handleClick(group)} key={group.id}>
                                <ListItemIcon>
                                    <Avatar alt={group.name}
                                            src="/broken-image.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={group.name}/>
                            </ListItem>
                        ))}
                    </List>
                </Grid>


                {conversation.is ? (
                    <Grid item xs={9}>

                        <AppBar position="static">
                            <div className="navList3">
                                <div className="navList2">
                                    <Typography variant="h6">
                                        {groupDetails.name + " " + "Kod dostępu: " + groupDetails.code}
                                    </Typography>
                                </div>
                            </div>
                        </AppBar>

                        <List className={classes.messageArea}>
                            {actualMessage.map((groupMess) => (
                                console.log(groupMess),
                                (groupMess.sender !== idActualUser) ? (
                                    <ListItem key={groupMess.id}>
                                        <div className="photo">
                                            <Avatar alt="User"
                                                    src="/broken-image.jpg"/>
                                        </div>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" primary={groupMess.content}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" secondary={groupMess.date.split("T")[0] + " " + groupMess.date.split("T")[1].split(".")[0]}/>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ) : (
                                    <ListItem key={groupMess.id}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" primary={groupMess.content}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" secondary={groupMess.date.split("T")[0] + " " + groupMess.date.split("T")[1].split(".")[0]}/>
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

export default Teams;
