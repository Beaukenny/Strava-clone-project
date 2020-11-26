import React from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng,} from "use-places-autocomplete"
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption,} from "@reach/combobox";
import mapStyles from "./mapStyling.css"
const Search =({mapLocation}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
      location: {lat: ()=> 41.4993, lng: ()=> -81.6944},
      radius: 200 * 1000,
    })
  
    return (
      <div className="search">
      <Combobox
      onSelect={async (address) => {
        setValue(address, false)
        clearSuggestions()
        try{
          const response = await getGeocode({address});
          const {lat, lng} = await getLatLng(response[0]);
          mapLocation({lat, lng})
          // console.log(lat, lng);
          
        }catch(e) {
          console.log(e)
        }
      }}>
  
        <ComboboxInput 
        value={value} 
        onChange={(e)=> setValue(e.target.value)} 
        disabled={!ready} 
        placeholder="Where To Start?">
        </ComboboxInput>
    <ComboboxPopover>
      <ComboboxList>
       {status === "OK" && data.map(({id, description})=> <ComboboxOption key={id} value={description}/>)}     
      </ComboboxList>
      </ComboboxPopover>
      </Combobox>
      </div>
    )
  }

  export default Search