import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RouteCard from './RouteCard'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { getCertainRoutes, getCertainRoutes2 } from "./utils"
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete"
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import SearchIcon from '@material-ui/icons/Search';
import PhotoArray from '../PhotoArray'

const styles = makeStyles((theme) => ({
    paper: {
        maxWidth: 750,
        margin: 'auto',

    },
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


const SearchResult = () => {
    const classes = styles()
    const coordinates = useSelector((state) => state.search.coordinates)
    const [load, setLoad] = useState(false)
    const [data2, setData] = useState("")
    const [searchCoord, setSearchCoord] = useState("")

    useEffect(() => {
        async function getAllRoutes() {
            const result = await fetch(`/api/routes/`)
            let res = await result.json();
            setData(res)
            setLoad(!load)
        }
        if (!coordinates) {
            getAllRoutes();
        } else {
            getCertainRoutes(coordinates, setData, setLoad, load)
        }
    }, [])
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        location: { lat: () => 41.4993, lng: () => -81.6944 },
        radius: 200 * 1000,
    })

    const onClick = async () => {
        async function getAllRoutes() {
            const result = await fetch(`/api/routes/`)
            let res = await result.json();
            setData(res)
        }
        if (!searchCoord) {
            getAllRoutes();
        } else {
            getCertainRoutes2(searchCoord, setData)
        }
    }
    if (!load) {
        return null
    }

    return (
        <>
            <Typography variant="h3" component="h3" color="primary" align="center">Explore Routes:</Typography>
                    <Button style={{left:'70%'}} fontSize="large" color="primary" variant="contained"
                    onClick={()=>window.location.replace(`/users/${window.localStorage.getItem("currentUser")}/route/create`)}
                    >Create Route</Button>

            <Grid container>
                <Grid item xs={12} align="center" >
                    <DirectionsWalkIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '25pt' }}></DirectionsWalkIcon>
                    <DirectionsBikeIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginRight: '12.5pt', marginLeft: "12.5" }}></DirectionsBikeIcon>
                    <DirectionsRunIcon fontSize="large" style={{ color: "gray", marginBottom: '5pt', marginTop: '15pt', marginLeft: '25pt' }}></DirectionsRunIcon>
                    <div className="splashSearchBar1">
                        <IconButton >
                            <SearchIcon />
                        </IconButton>

                        <Combobox
                            className="SplashCombo"
                            onSelect={async (address) => {
                                setValue(address, false)
                                clearSuggestions()
                                try {
                                    const response = await getGeocode({ address });
                                    const { lat, lng } = await getLatLng(response[0]);
                                    setSearchCoord({ lat: lat, lng: lng })

                                } catch (e) {
                                    console.log("Error received from either getGeocode or getLatLng:  ", e)
                                }
                            }}>

                            <ComboboxInput
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                disabled={!ready}
                                className="splashSearch"
                                placeholder="Search ">
                            </ComboboxInput>
                            <ComboboxPopover>
                                <ComboboxList
                                    className="splashSeachOption"
                                >

                                    {status === "OK" && data.length > 3 &&
                                        <>
                                            <ComboboxOption

                                                as="h4" key={data[0].id} value={data[0].description} />
                                            <ComboboxOption
                                                as="h4" key={data[1].id} value={data[1].description} />
                                            <ComboboxOption
                                                as="h4" key={data[2].id} value={data[2].description} />
                                        </>
                                        }
                                            {status === "OK" && data.length === 1 &&
                                        <>
                                            <ComboboxOption

                                                as="h4" key={data[0].id} value={data[0].description} />
                                        </>
                                        }

                                </ComboboxList>
                            </ComboboxPopover>
                        </Combobox>
                        <Button
      style={{height:"20pt", top:'2pt'}}
      size="small"
      variant="contained"
      color='primary' aria-label="search" onClick={onClick}
      >Search</Button>
                    </div>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                {data2.routes.length == 0 ? <h1>There is no Route</h1> : data2.routes.map(each =>
                <>
                    <RouteCard data={each}></RouteCard>
                    <PhotoArray workout_id={each.id}></PhotoArray>
                </>
                )}

            </Paper>
        </>
    )
}


export default SearchResult;
