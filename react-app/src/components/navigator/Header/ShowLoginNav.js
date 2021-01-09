import React, {useState} from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemText, Avatar } from "@material-ui/core";
import { useHistory} from "react-router-dom";

const ShowLoginNav = () => {
        // setOpen(!open);
    // const { page } = useParams();
    // const { classes, value } = useState();
    const history = useHistory()
    // const tabNameToIndex = {
    //     0: "home",
    //     1: "workouts",
    //     2: "routes",
    //     3: "explore",
    //     4: "user",
    // }

    // const indexToTabName = {
    //     home: 0,
    //     workouts: 1,
    //     routes: 2,
    //     explore: 3,
    //     user: 4,
    // }


    const [open, setOpen] = useState(false);



    const handleClick = () => {
        setOpen(!open);
    };



        return (
            <List >
                <ListItem button onClick={handleClick}>
                    <ListItemText primary={<Avatar
                        // src="/favicon-copy.png"
                        // className={classes.large}
                        />} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ListItem value={0} button onClick={() => history.push('/login')}>
                        <ListItemText primary="Log In" />
                    </ListItem>
                    <ListItem value={1} button onClick={() => history.push('/sign-up')}>
                        <ListItemText primary="Sign Up" />
                    </ListItem>
                    {/* <ListItem value={2} button onClick={handleClick}>
                        <ListItemText primary="Demo" />
                    </ListItem> */}
                    {/* <ListItem value={3} button onClick={handleLogout}>
                        <ListItemText primary="Log Out" />
                    </ListItem> */}
                </Collapse>
            </List>
        )
}

export default ShowLoginNav;
