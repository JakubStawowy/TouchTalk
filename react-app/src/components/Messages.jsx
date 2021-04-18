import React, { useState }  from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import EmailIcon from '@material-ui/icons/Email';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
import "./Messages.css"

function detectMob() {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
  }

const Messages = () => {
    let usersWidth = 3;
    let conversationWidth = 8;
    const [conversation, setConversation] = useState({'is' : false});

    if (detectMob()){
        usersWidth = 12;
        conversationWidth = 12;
    }
    return (
        <div class='size'>
            <Grid container component={Paper} fullHeight>
                {detectMob() && conversation.is ? null : (<Grid item xs={usersWidth} >
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" >
                            Czat
                            </Typography>
                            <div class='search'>
                                <SearchIcon />
                            </div>
                                <InputBase
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            <p>
                                <EmailIcon />
                            </p>
                            <div class="sea">
                                <InputBase placeholder="Search…"></InputBase>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button key="User1" onClick={()=>setConversation({'is': true})}>
                            <ListItemIcon>
                                <Avatar alt="User1" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Kamil Tomasiak">User1</ListItemText>
                            <c1>  </c1>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="User2" onClick={()=>setConversation({'is': true})}>
                            <ListItemIcon>
                                <Avatar alt="User2" src="https://material-ui.com/static/images/avatar/2.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Kacper Ogórek">User2</ListItemText>
                            <c1>  </c1>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="User3" onClick={()=>setConversation({'is': true})}>
                            <ListItemIcon>
                                <Avatar alt="User3" src="https://material-ui.com/static/images/avatar/7.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Kornelia Wastag">User2</ListItemText>
                            <c1>  </c1>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                    </List>  
                </Grid>)}
                {detectMob() ? null : (<Grid item xs={1} >
                    <Divider orientation="vertical"/>
                </Grid>)}
                {detectMob() && !conversation.is ? null : (<Grid item xs={conversationWidth} >
                <div class='right-navbar'>
                <AppBar position="static">
                <Toolbar>
                <div class='photo1'>
                   <Avatar alt="User1" src="https://material-ui.com/static/images/avatar/3.jpg" />
                </div>
                <Typography variant="h6" >
                   Alicja Kowalczyk
                </Typography>
                <div class='dane'>
                  <button>Czat</button> 
                  <button>Pliki</button> 
                  <button>Zdjęcia</button> 
                  <button>Filmy</button> 
                </div>
                <div class='talk'>
                  <button><PersonAddSharpIcon/></button> 
                  <button><VideocamSharpIcon/></button> 
                  <button><PhoneSharpIcon/></button>
                </div>
                </Toolbar>
                </AppBar>
                </div>
                <div class='mess'>
                    <List>
                      <div class='photo'>
                        <Avatar alt="User" src="https://material-ui.com/static/images/avatar/3.jpg" />
                      </div>
                        <ListItem key="1">
                            <Grid container>
                                <div class='message'>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hej co tam?"></ListItemText>
                                </Grid>
                                </div>
                                <Grid item xs={12}>
                                <div class='date'>
                                    <ListItemText align="left" secondary="09:30"></ListItemText>
                                </div>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                            <div class='messages'>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="A nic, oglądam Bojack'a"></ListItemText>
                                </Grid>
                                </div>
                                <Grid item xs={12}>
                                <div class='dat'>
                                    <ListItemText align="right" secondary="09:33"></ListItemText>
                                </div>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    </div>
                    <Grid container >
                        <div class='type'>
                        <Grid item xs={11}>
                            <TextField id="Message" label="Start typing for reply..." fullWidth />
                        </Grid>
                        </div>
                        <k>
                            <MoodIcon/>
                        </k>
                        <l>
                            <Fab color="transparent" aria-label="add"><AttachFileIcon/></Fab>
                        </l>
                        <div class='add'>
                        <Grid xs={1} align="right">
                        <div class='right'>
                           <SendIcon />
                        </div>
                        </Grid>
                       </div>
                    </Grid>
                </Grid>)}
            </Grid>
        </div>
    );
};

export default Messages;
