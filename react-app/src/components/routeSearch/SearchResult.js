import { formatMs } from '@material-ui/core';
import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRouteWithCoords } from '../../store/actions/routeSearch';
import { apiUrl } from '../../config';

const SearchResult = () =>{

    const dispatch = useDispatch();
    const coordinates = useSelector((state)=> state.search.coordinates)
    let res;


    useEffect(() => {
        async function getRoutes () {
            const result = await fetch(`${apiUrl}/routes`)
            res = await result.json();
        }
        getRoutes();
    }, [])
    
    return (
        <div>
            <button onClick={()=> console.log(res.routes)}>RES</button>
            <button onClick={()=> console.log(coordinates)}>COORDINATES</button>
        </div>

    )
}

export default SearchResult;
