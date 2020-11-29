import { formatMs } from '@material-ui/core';
import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRouteWithCoords } from '../../store/actions/routeSearch';
import { apiUrl } from '../../config';
import RouteCard from './RouteCard'
import Search from "./Searchbar"

const SearchResult = () =>{
    // const dispatch = useDispatch();
    const coordinates = useSelector((state)=> state.search.coordinates)
    const [load, setLoad] = useState(false)
    const [data, setData] = useState("")
    useEffect(() => {
        async function getAllRoutes () {
            const result = await fetch(`${apiUrl}/routes`)
            let res = await result.json();
            setData(res)
            setLoad(!load)
        }
        if (!coordinates){
           getAllRoutes(); 
        }
        
    }, [])
    if (!load) {
        return null
    }

        return (
            <>

            <button onClick={()=> console.log(data.routes[0].staticImageURL)}>RES</button>
            <button onClick={()=> console.log(coordinates)}>COORDINATES</button>
            <button onClick={()=> console.log(data)}>data</button>
            <button onClick={()=> console.log(load)}>load</button>

            <Search></Search>
     <div>
         {data.routes.map(each=> 
         
            <RouteCard data={each}></RouteCard>
         
        )}
 

     </div>
   </>
    )}


export default SearchResult;
