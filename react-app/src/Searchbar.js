import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Searchbar() {
  const classes = useStyles();

  return (
    <div>
        <div>
            <Grid
                container
                // spacing={-1}
                direction="row"
                justify="space-between"
                style={{marginBottom: "20px", fontWeight:"bold"}}
                alignItems="space-around"
                >
                <i class="fas fa-biking fa-3x"></i>
                <i class="fas fa-hiking fa-3x"></i>
                <i class="fas fa-running fa-3x"></i>
            </Grid>
        </div>
        <Paper component="form" className={classes.root}>
          {/* <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon />
          </IconButton> */}

          <InputBase
            className={classes.input}
            placeholder="Please Enter Destination"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          {/* <IconButton color="primary" className={classes.iconButton} aria-label="directions">
            <DirectionsIcon />
          </IconButton> */}
        </Paper>
    </div>

  );
}
