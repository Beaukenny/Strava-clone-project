import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getCertainRoutes2 } from "../routeSearch/utils"
import { apiUrl } from '../../config';



// const SideBar = ({origin}) => {
//     const [load, setLoad] = useState(false)
//     const [data, setData] = useState("")

//     useEffect(() => {
//         async function getNearByRoutes() {
//             const result = await fetch(`${apiUrl}/routes`)
//             let res = await result.json();
//             setData(res)
//             setLoad(!load)
//         }
//         getCertainRoutes2(origin, setData)
//     }, [])

//     return (
//         <>
//         <button onClick={()=>console.log(data)}>console</button>
        
//         </>
//     )
// }

const useStyles = makeStyles((theme) => ({

    root: {
        minWidth: 260,
      },
      title: {
        fontSize: 14,
      },


  }));
  
  export default function SideBar({origin}) {
    const classes = useStyles();
       const [load, setLoad] = useState(false)
    const [data, setData] = useState("")
    useEffect(() => {
        async function getDataAndSetData(){
       await getCertainRoutes2(origin, setData)
       await setLoad(!load)
    }
    getDataAndSetData()
                
            }, [])
        
  if(!load){
      return null
  }

    return (
        <><div className="sideBarContainer">

        
        <Typography align='center' variant="h5" component="h5" style={{color:"gray"}}>Select from nearby <br></br>routes to edit:</Typography>
        <Card className={classes.root} variant="outlined" style={{padding: '5px', boxShadow: '1px 0px lightgray', borderLeft:'none',borderBottom:'none',borderTop:'none'}}>
            {data.routes.map(each => 
                      <CardContent>
                      <Avatar
                    //   src={origin.host.avatar_url ? origin.host.avatar_url : null}
                      style={{left:'120pt', top:'45pt'}}
                      src={each.host.avatar_url ? each.host.avatar_url : null}
                      ></Avatar>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          {each.name}
                        </Typography>
                
                        <Typography variant="body2" component="p">
                            By: {each.host.username}<br></br>
                            Est Time: {each.totalDuration}<br></br>
                            Elevation: {each.totalElevation}<br></br>
                            Distance: {each.totalDistance}<br></br>

                        </Typography>
                      </CardContent>
                )}

      
    </Card>
    </div>
      </>
    );
  }
