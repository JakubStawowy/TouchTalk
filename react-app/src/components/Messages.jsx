import React from "react";
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


const Messages = () => {
    return (
        <div>
            <Grid container component={Paper} fullHeight>
                <Grid item xs={3} >
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" >
                            Users
                            </Typography>
                            <div >
                                <SearchIcon />
                                <InputBase
                                    placeholder="Search…"

                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button key="User1">
                            <ListItemIcon>
                                <Avatar alt="User1" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="User1">User1</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="User2">
                            <ListItemIcon>
                                <Avatar alt="User2" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="User2">User2</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="User3">
                            <ListItemIcon>
                                <Avatar alt="User3" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="User3">User2</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                    </List>  
                </Grid>
                <Grid item xs={1} >
                    <Divider orientation="vertical"/>
                </Grid>
                <Grid item xs={8} >
                    <List>
                        <ListItem key="1">
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
                    <Divider/>
                    <Grid container >
                        <Grid item xs={11}>
                            <TextField id="Message" label="Type" fullWidth />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Messages;