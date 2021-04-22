import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import EmailIcon from '@material-ui/icons/Email';
import GifIcon from '@material-ui/icons/Gif';
import "./Messages.css"

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
    height: '76.5vh',
    overflowY: 'auto'
  }
});

const Messages = () => {
  const classes = useStyles();

  return (
    <div>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
            <AppBar position="static">
            <div className="navList3">
                <div className="navList2">
                    <Typography variant="h6" >
                        Czat
                    </Typography>
                    <button><ExpandMoreIcon/></button>
                </div>
                <div algin="flex-end">
                    <button><SearchIcon /></button>
                            {/* <InputBase
                                    inputProps={{ 'aria-label': 'search' }}
                                /> */}

                            {/* <div class="sea">
                                <InputBase placeholder="Search…"></InputBase>
                            </div> */}
                        <button><EmailIcon /></button>
                    </div>
                </div>
            </AppBar>
                <List>
                <ListItem button key="User1" >
                    <ListItemIcon>
                        <Avatar alt="User1" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Kamil Tomasiak">User1</ListItemText>
                    <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem button key="User2">
                        <ListItemIcon>
                            <Avatar alt="User2" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Kacper Ogórek">User2</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem button key="User3" >
                        <ListItemIcon>
                            <Avatar alt="User3" src="https://material-ui.com/static/images/avatar/7.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Kornelia Wastag">User2</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <div class="photo">
                            <Avatar alt="User" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </div>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hej co tam?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="A nic, oglądam Bojack'a"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:33"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <div class='bottom-bar'>
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Napisz nową wiadomość..." fullWidth />
                        <button><TextFieldsIcon/></button>
                        <button><WallpaperIcon/></button>
                        <button><MoodIcon/></button>
                        <button><GifIcon/></button>
                    </Grid>
                    <Grid xs={1} align="right" >
                        <button><SendIcon /></button>
                    </Grid>
                </Grid>
                </div>
            </Grid>
        </Grid>
      </div>
      
  );
}

export default Messages;