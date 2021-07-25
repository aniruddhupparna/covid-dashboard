import React from "react";
import './header.styles.css';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {marginLeft: 240, width: `calc(100% - 240px)`, background: '#166fe5'}
}));

export default function Header() {
    const classes = useStyles();
    return (<AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        COVID STATS
                    </Typography>
                    </Toolbar>
            </AppBar>)
}