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
import "../style/Teams.css"


import axios from "axios";
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Add} from "@material-ui/icons";
import AddGroup from "./AddGroup";
import JoinGroup from "./JoinGroup";
import {Button} from "@material-ui/core";
import {handleNetworkError} from "../actions/handleNetworkError";


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

        height: '65vh',
        overflowY: 'auto'
    },

    listScroll: {
        overflow: "auto"
    }
});

const api = axios.create({
    baseURL: `http://localhost:8080/`
})

let stompClient = null;
let groupId = 0;

const Teams = () => {

    const auth = useSelector(state => state.auth);
    const history = useHistory()
    if (!auth.login)
        history.push('/');

    const classes = useStyles();

    let idActualUser = parseInt(localStorage.getItem("id"));

    const [conversation, setConversation] = useState({'is': false});

    const [searchText, setSearchText] = useState("");

    function search (groups){
        const groupKey =["name"];

        let filtr =groups.filter((group) =>
        groupKey.some((key)=> group[key].toString().toLowerCase().indexOf(searchText.toString()) > -1));
        return filtr;
    }
    const [message, setMessage] = useState({
        content: "",
        sender: 0,
        receiver: 0,
        imageURL: "Empty"
    })

    const [actualMessage, setActualMessage] = useState([]);


    const connect = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);

    }

    const onConnected = () => {

        stompClient.subscribe('/topic/' + groupId, onMessageReceived);

    }
    const onMessageReceived = (payload) => {
        getMessage(groupId);
    }

    const sendMessage = () => {

        if (stompClient && message.content !== "") {

            stompClient.send("/app/sendGroupMessage", {}, JSON.stringify(message));
            console.log(message)

            setMessage({...message, content: ""});

            setTimeout(() => {
                getMessage(groupId);
                let a = 0;
                a = a + 1
            }, 500);
        }
    }


    const onError = (error) => {
        console.log("error");
    }

    const getMessage = groupId => {

        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        api.get('/api/messgrouplist/' + groupId, config).then(response => response.data)
            .then(data => {
                    setActualMessage(data)
                }
            ).catch((error) => {
            handleNetworkError(error, () => history.push("/"));
        });

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

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        };

        api.get(`/api/groups?id=${idActualUser}`, config).then(response => response.data)
            .then(data => setGroups(data)).catch((error) => {
            handleNetworkError(error, () => history.push("/"));
        });
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
    const getUserDetails = group => {
        let userDetails = {
            username: "",
            surname: ""
        }

        group.receiverBody.users.filter((userId) => userId["id"] === group.sender).map(user => {
            userDetails.surname = user.surname
            userDetails.username = user.username

        })
        return userDetails.username + " " + userDetails.surname;

    }

    const [openAdd, setOpenAdd] = React.useState(false);
    const [openJoin, setOpenJoin] = React.useState(false);
    const handleOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleOpenJoin = () => {
        setOpenJoin(true);
    };
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    const handleCloseJoin = () => {
        setOpenJoin(false);
    };

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


                    <div className="group_options">
                        <Button variant="contained" color="primary" onClick={handleOpenJoin}>Dołącz do grupy</Button>
                        <JoinGroup open={openJoin} handleClose={handleCloseJoin}/>
                        <Button variant="contained" color="primary" onClick={handleOpenAdd}>Stwórz grupę</Button>
                        <AddGroup open={openAdd} handleClose={handleCloseAdd}/>
                    </div>


                    <List className={classes.listScroll}>
                        {search(groups).map(group => (
                            <ListItem button onClick={() => handleClick(group)} key={group.id}>

                                    <Avatar alt={group.name}
                                            src="/broken-image.jpg"/>

                                <a>{group.name}</a>
                            </ListItem>
                        ))}
                    </List>
                </Grid>


                {conversation.is ? (
                    <Grid item xs={9} >

                        <AppBar position="static">
                            <div className="navList">
                                    <Typography variant="h6">
                                        {groupDetails.name}
                                    </Typography>
                                <Typography variant="h6">
                                    {"Kod dostępu: " + groupDetails.code}
                                </Typography>
                            </div>
                        </AppBar>

                        <List className={classes.messageArea}>
                            {actualMessage.map((groupMess) => (
                                (groupMess.sender !== idActualUser) ? (

                                    <ListItem key={groupMess.id} xs={12}>
                                        <Grid className="messageAreaLeft" container xs={12}>
                                            <Grid xs={1} className="photo">
                                                <Avatar alt="User"
                                                        src="/broken-image.jpg"/>
                                            </Grid>
                                            <Grid item className="messageContent">
                                                {/*{(groupMess.imageURL!=="Empty")?(*/}
                                                {/*    <ListItem>*/}
                                                {/*        <Grid container>*/}
                                                {/*            <Grid item xs={12} className={classes.picture}>*/}
                                                {/*                <div class="pictureContainer">*/}
                                                {/*                    <img className="picture" src={groupMess.imageURL} alt="/broken-image.jpg"/>*/}
                                                {/*                </div>*/}
                                                {/*            </Grid>*/}
                                                {/*        </Grid>*/}
                                                {/*    </ListItem>*/}
                                                {/*):null}*/}



                                                <ListItemText align="left" secondary={getUserDetails(groupMess)}/>
                                                <ListItemText  align="left" primary={groupMess.content}  />
                                                <ListItemText className="data-message" align="left"
                                                                  secondary={groupMess.date.split("T")[0] + " " + groupMess.date.split("T")[1].split(".")[0]}/>

                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ) : (
                                    <ListItem key={groupMess.id}>
                                        <Grid className="messageAreaRight" container>
                                            <Grid item className="messageContent">
                                                {/*{(groupMess.imageURL!=="Empty")?(*/}

                                                {/*    <ListItem>*/}
                                                {/*        <Grid container>*/}
                                                {/*            <Grid item xs={12} className={classes.picture}>*/}
                                                {/*                <div class="pictureContainer">*/}
                                                {/*                    <img className="picture" src={groupMess.imageURL} alt="/broken-image.jpg"/>*/}
                                                {/*                </div>*/}
                                                {/*            </Grid>*/}
                                                {/*        </Grid>*/}
                                                {/*    </ListItem>*/}
                                                {/*):null}*/}

                                                <ListItemText align="right" primary={groupMess.content}/>

                                                <ListItemText className="data-message" align="right"
                                                              secondary={groupMess.date.split("T")[0] + " " + groupMess.date.split("T")[1].split(".")[0]}/>
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
                                    <button onClick={sendMessage}><SendIcon/></button>
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
