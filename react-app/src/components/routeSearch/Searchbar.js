import React, {useState} from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng,} from "use-places-autocomplete"
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption,} from "@reach/combobox";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {getAllRouteWithCoords, searchedPlaceCoord} from "../../store/actions/routeSearch"
import { useSelector, useDispatch } from "react-redux";



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

function Searchbar() {
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


const Search =() => {
  const classes = useStyles();
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
      location: {lat: ()=> 41.4993, lng: ()=> -81.6944},
      radius: 200 * 1000,
    })
    const [searchCoord, setSearchCoord] = useState("")
    const dispatch = useDispatch()
    const onClick=async () => {
      // console.log(searchCoord)
      await dispatch(searchedPlaceCoord(searchCoord))
      // window.location.replace("/search-result")
      
    }
    return (
      <>
      <Combobox
      onSelect={async (address) => {
        setValue(address, false)
        clearSuggestions()
        try{
          const response = await getGeocode({address});
          const {lat, lng} = await getLatLng(response[0]);
          setSearchCoord({lat:lat, lng:lng})

        }catch(e) {
          console.log(e)
        }
      }}>

        <ComboboxInput
        value={value}
        onChange={(e)=> setValue(e.target.value)}
        disabled={!ready}
        placeholder="Choose starting address or city ...">
        </ComboboxInput>
    <ComboboxPopover>
      <ComboboxList>
       {status === "OK" && data.map(({id, description})=>
       <ComboboxOption
       as="h6" key={id} value={description}/>)}
      </ComboboxList>
      </ComboboxPopover>
      </Combobox>
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onClick}>
      <SearchIcon/>
    </IconButton>
    </>
    )
  }

  export default Search
