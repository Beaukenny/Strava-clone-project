import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete"
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { getAllRouteWithCoords, searchedPlaceCoord } from "../../store/actions/routeSearch"
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom"


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

const Search = () => {
  const classes = useStyles();
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    location: { lat: () => 41.4993, lng: () => -81.6944 },
    radius: 200 * 1000,
  })
  const [searchCoord, setSearchCoord] = useState("")
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  
  const onClick = async () => {
    // console.log(searchCoord)
    await dispatch(searchedPlaceCoord(searchCoord))
    setRedirect(!redirect)
  }


  if (redirect) {
    // setRedirect(!redirect)
    return (
      <Redirect to="/search-result"></Redirect>
    )
  } else {
    return (<>
    <div className="splashSearchBar1">
    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onClick}>
        <SearchIcon/>
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
            // console.log(e)
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
            {status === "OK" &&
            <>
              <ComboboxOption
              
                as="h4" key={data[0].id} value={data[0].description} />
                <ComboboxOption
                as="h4" key={data[1].id} value={data[1].description} />
                <ComboboxOption
                as="h4" key={data[2].id} value={data[2].description} />
                </>}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      </div>
    </>)
  }
}


export default Search
