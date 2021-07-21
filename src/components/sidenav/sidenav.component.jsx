import React from "react";
import './sidenav.styles.css';

import { List, Drawer, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PublicIcon from '@material-ui/icons/Public';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        flexShrink: 0,
      },
    drawerPaper: {
        width: 240,
        backgroundColor: "black",
        color: "white"
      }
}));

const sidenavItems = [
    {"name":"Dashboard", "link": "/covid-dashboard","icon": <EqualizerIcon style={{ color: "green" }}/>},
    {"name":"Countrywise stats", "link": "/covid-dashboard/countrywise-stats", "icon": <PublicIcon style={{ color: "green" }} />}
]

export default function SideNav() {
    const classes = useStyles();
    return (
        <Drawer variant="permanent" open className={classes.drawer} classes={{paper: classes.drawerPaper}}>
            <List>
            {sidenavItems.map(navItem => 
                <Link to={navItem.link}>
                <ListItem button key={navItem.name}>
                    <ListItemIcon>{navItem.icon}</ListItemIcon>
                    <ListItemText primary={navItem.name} />
                </ListItem>
                </Link>)}
            </List>
        </Drawer>
    )
}