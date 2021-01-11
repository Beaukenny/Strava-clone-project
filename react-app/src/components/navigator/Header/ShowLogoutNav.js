import React, {useState,useEffect} from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {  List, ListItem, ListItemText, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {logout} from "../../../services/auth"
const ShowLogoutNav = () => {
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
    const [avatarUrl, setAvatorUrl] = useState('')

    useEffect(()=> {

        const getAvatarUrl = async () => {
            const responce = await fetch(`/api/users/${window.localStorage.getItem("currentUser")}`)
            const parsedData = await responce.json()
            setAvatorUrl(parsedData.avatar_url)
        }
        getAvatarUrl()
    },[])


    const handleClick = () => {
        setOpen(!open);
    };

    const handleLogout = async () => {
        // handle logout here
        //? TODO *******
        await logout()
        window.localStorage.removeItem("currentUser")
        setAvatorUrl('')

        history.push('/');
    }

        return (
            <List >
                <ListItem button onClick={handleClick}>
                    <ListItemText primary={<Avatar
                        src={!avatarUrl ? null : avatarUrl}
                        />} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ListItem value={3} button onClick={handleLogout}>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                </Collapse>
            </List>
        )
}

export default ShowLogoutNav;
