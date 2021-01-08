import React, { useState, useEffect } from 'react';

import { Button, GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getAllPhotos } from '../services/photos';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import  { addPhoto } from '../services/photos'

const PhotoArray = ( {workout_id} ) => {
    const [tileData, setTileData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [init, setInit] = useState(false);
    const [dropZoneOpen, setDropZoneOpen] = useState(false);
    const [hasTileData, setHasTileData] = useState(false);
    const [inEditWorkout, setInEditWorkout] = useState(false);

    //console.log("Location is:  ", window.location.pathname);
    //console.log("dropZoneOpen:  ", dropZoneOpen);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
            // cols: 6,
            // imgFullHeight: '20%',
            // width: '40%',
        //   height: '20%',
        },
        tile: {
            width: "100px",
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0,3) 70%, rgba(0,0,0,0) 100%)'
        }
    }));
    const classes = useStyles();

    useEffect( () => {
        const path = window.location.pathname.split("/");
        //console.log("Path:  ", path);
        if (path.length === 5 && path[1] === 'users' && path[3]==='workout') {
            setInEditWorkout(true);
        };
        //console.log("PhotoArray useEffect:  init is: ", init);
        if (!init) {
            //console.log("PhotoArray useEffect:  Calling getPhotos!")


            getPhotos();
            setInit(true)

    }

    }, [tileData]);

    const getPhotos = async(e) => {
        //console.log("Inside getPhotos!")
        const photoArray = await getAllPhotos(workout_id);
        //console.log("photoArray received from backend for workout id:", workout_id , ": ", photoArray.length)
        if (!photoArray.errors) {
            let td = [];
            // console.log("PhotoArray - useEffect -  photoArray.length for workout id:  ", workout_id, " : ", photoArray.length)
            for (let i = 0; i < photoArray.length; i++) {
                td.push(photoArray[i].photoUrl)
            }
            setTileData(td)
        } else {
            console.log("We have errors in getAllPhotos:  ", photoArray.errors);
            setErrors(photoArray.errors);
        }

    }
    const handleOpenDropZone = (e) => {
        console.log("Drop zone set to open - true")
        setDropZoneOpen(true)
    }

    const handleCloseDropZone = (e) => {
        console.log("Drop zone set to closed - false")
        setDropZoneOpen(false)
    }
    const handleDroppedFile = async (file) => {
        console.log("INSIDE handleDroppedFile");
        //setDropZoneOpen(false)
    }


    const handleOnSave = async (file) => {
        setDropZoneOpen(false)
        console.log("INSIDE handleOnSave")
        const form_data = new FormData();
        console.log("file:  ", file);
        console.log("file length: ", file.length);
        for (let i=0; i < file.length; i++) {
            console.log("Adding to formData: ", file[i]);
            form_data.append('image', file[i]);
        }
        console.log("calling addPhoto");
        const photo = await addPhoto(form_data, workout_id);
        console.log("after calling addPhoto");
        if (!photo.errors) {
            console.log("No error ")
            getPhotos();
        } else {
            console.log("Got an error ");
        }
        console.log("Setting DropZone to false");


    }

// if (tileData.length === 0) {
//         console.log("PhotoArray - Render Null - Workout id:  ", workout_id, "No tile data found for workout id: ", workout_id);
//         return null;
//     }

if (tileData.length > 0) {
        //console.log("PhotoArray - Render Workout id:  ", workout_id, "Tile Data Length:  ", tileData.length, " tileData:  ", tileData)
        // tileData.map( (tile, index) => {
        //     console.log("Workout[", workout_id, "]:", tile)
        // })
        // console.log("tileData has : ", tileData.length, " elements");
        // for (let i = 0; i < tileData.length; i++) {
        //     console.log("workout[", workout_id,"][",i,"]:", tileData[i]);
        // }Worout
        return (
            <>
            <div className={classes.root} >
                <GridList className={classes.gridList} cols={2.5} style={{justifyContent:"center", width:"75%"}}
                >
                    { console.log("Render:  workout[", workout_id, "] has ", tileData.length, " elements") }
                     {tileData.map( (foo, index) => {
                         //console.log("workout_id:", workout_id, "tileData[", index, "]:", foo)
                         return (
                            <GridListTile key={index} style={{width:"100px", height:"150px"}}>
                                <img src={foo} alt={"image"}  />
                            </GridListTile>
                         )

                    } )}

                </GridList>
                { inEditWorkout ?
                    <>
                        <Button onClick={handleOpenDropZone}>Add Image</Button>
                        {  dropZoneOpen ? <div><DropzoneDialog
                            open={dropZoneOpen}
                            onSave={handleOnSave}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            showPreviews={true}
                            maxFileSize={5000000}
                            onClose={handleCloseDropZone}
                            />
                        <DropzoneArea onChange={handleDroppedFile} /> </div> : <div></div> }
                    </>
                    : null }
            </div>
            </>
        );
                } else {
                    return null;
                }
}

export default PhotoArray;
