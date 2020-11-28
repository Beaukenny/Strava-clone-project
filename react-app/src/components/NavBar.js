import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
// import logo
// import redux if use

import LogoutButton from './auth/LogoutButton';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// AppBar
// Tabs
// Tab

// import login / signup dialog
// import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';


const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


const useStyles = makeStyles({
    headerCenter: {
        zIndex: 1000,
        position: "absolute",
        left: "40.5%",
        top: "-55px",
        width: "140px",
        height: "220px",
    },
    headerWrapper: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        width: "100vw",
    },
    header: {
        zIndex: 101,
        color: "black",
        position: "absolute",
        height: "80px",
        width: "51%",
        // borderTop: "60px solid purple",
        // borderLeft: "25px solid transparent",
        // borderRight: "25px solid transparent",
        // borderBottom: "1px solid grey"
    },
    flexMain: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%"
        // backgroundColor: "green",
    },
    flexItemsRight: {
        zIndex: 102,
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        // alignContent: "center",
        // right: "150px",
        // margin: "10px",
        width: "50%",
        height: "60px"
    },
    flexItemsLeft: {
        zIndex: 102,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // right: "150px",
        // margin: "10px",
        width: "50%",
        height: "60px"
    },
    navMenu: {
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        position: "relative",
        height: "12vh",
        width: "90vw",
        // right: "5%",
        left: "5%",
        // top: "6.5%",
        // boxShadow: "1px 1px 10px 1px purple",
        // borderRadius: "10px",
        
        // background: "linear-gradient(0deg, purple 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%)"
    },
    navMenuLinks: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        borderBottom: "3px solid lightgrey",
    },
    navItem: {
        color: "grey",
        paddingLeft: "3em",
        fontWeight: "bold",
        "&:hover": {
            color: "purple",
            backgroundColor: "white",
            // borderRadius: "10px",
            borderBottom: "3px solid purple",
            // backgroundColor: "rgba(220,220,220, .2)",
            transform: "scale(1.1)"
        }
    },
    customSize: {
        display: "flex",
        justifyContent: "center",
    },
    cutLog: {
        position: "absolute",
        background: "white",
        height: "70%",
        right: "34.4vw",
        width: "150px",
        top: "33%",
        // clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%);",
    },
    cutSign: {
        position: "absolute",
        background: "white",
        top: "33%",
        right: "26.5vw",
        height: "40px",
        width: "150px",
        // clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%);",
    },
    workoutsPlus: {
        position: "absolute",
        background: "white",
        // top: "33%",
        left: "36.3vw",
        height: "70%",
        width: "150px",

        clipPath: "polygon(0% 0, 90% 0, 100% 100%, 11% 100%);"
    },
    routesPlus: {
        position: "absolute",
        background: "white",
        // top: "33%",
        left: "24.5vw",
        height: "70%",
        width: "9rem",
        clipPath: "polygon(0% 0, 90% 0, 100% 100%, 13% 100%);"
    },
    explorePlus: {
        position: "absolute",
        background: "white",
        // top: "33%",
        left: "48.5vw",
        height: "70%",
        width: "9rem",
        clipPath: "polygon(0% 0, 90% 0, 100% 100%, 13% 100%);"
    },
    roundIcon: {
        color: "white",
        width: "40px",
        opacity: .8,
        "&:hover": {
            opacity: 1,
            // transform: "scale(1.08)"
        }
    },
});

const NavBar = ({ setAuthenticated }) => {

  const classes = useStyles()
  const [expanded, setExpanded] = useState(false);
  const history = useHistory()
  // const {userId} = request.params();

  const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    };

  const onMouseLeave = () => {
      if (window.innerWidth < 960) {
          setExpanded(false);
      } else {
          setExpanded(false);
      }
  };

  useEffect(() => {
      return setExpanded(false)
  }, [])

  const handleLogout = () => {
      setExpanded(false)
      // dispatch(logout())
      history.push('/')
  }




  return (
    <div>
        {/* <div className={classes.headerCenter}>
          <NavLink to="/" activeclass="active">
              <HeaderLogo />
              
          </NavLink>
        </div> */}
        {/* <div className={classes.headerWrapper}>
          <div className={classes.header}/>
            <div className={classes.flexMain}>
              <div className={classes.flexItemsLeft}>
                <Button variant="contained" className={classNames(classes.workoutsPlus)} onClick={() => history.push(`/users/1/route/create`)} activeclass="active">
                  Workouts
                </Button>
                <Button variant="contained" className={classNames(classes.routesPlus)} onClick={()=> history.push('/users/1/routes')} activeclass="active">
                  Routes
                </Button>
                <Button variant="contained" className={classNames(classes.explorePlus)} onClick={()=> history.push('/')} activeclass="active">
                  Explore
                </Button>
              </div>
              <div className={classes.flexItemsRight}>
                <p>test</p>
              </div>
            </div>
          </div> */}
          {/* <nav className="navbar"> */}
            <div>
              {/* <Collapse
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                in={expanded}
                // in={true}
                timeout="auto"
                unmountOnExit
              > */}
                <div>
                </div>
                <AppBar position="static">
                  <Tabs value={value} onChange={this.handleChange}>
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" href="#basic-tabs" />
                  </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>Item One</TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
                <nav className={classes.navMenu}>
                  <div className={classes.navMenuLinks}>
                    <Button onClick={() => history.push('/')}
                      className={classNames(classes.navItem)} activeclass="active">
                      <div style={{ borderRadius: "15px", height: "60px", width: "60px", backgroundColor: "purple" }}>∆∆∆∆∆</div>
                    </Button>
                    <Button
                    onClick={() => history.push('/users')}
                    className={classNames(classes.navItem)}>
                      <DashboardIcon/>
                      Workouts
                    </Button>
                    <Button
                    onClick={() => history.push('/users/1/route/create')}
                    className={classNames(classes.navItem)}>
                      <PersonOutlineIcon/>
                      Routes
                    </Button>
                    <Button
                      className={classNames(classes.navItem, classes.customSize)}
                      onClick={handleLogout}
                    >
                      Explore
                    </Button>
                    {/* <div style={{ justifySelf: "flex-end"}}> */}
                    <Button
                      className={classNames(classes.navItem)}
                      style={{ width: "200px", justifySelf: "flex-end"}}>
                      <PersonOutlineIcon />
                    </Button>
                    {/* </div> */}
                  </div>
                </nav>
              {/* </Collapse> */}
            </div>
          {/* </nav> */}
      </div>
  )
}





// const NavBar = ({ setAuthenticated }) => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to="/" exact={true} activeClassName="active">
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/login" exact={true} activeClassName="active">
//             Login
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/sign-up" exact={true} activeClassName="active">
//             Sign Up
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/users" exact={true} activeClassName="active">
//             Users
//           </NavLink>
//         </li>
//         <li>
//           <LogoutButton setAuthenticated={setAuthenticated} />
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default NavBar;