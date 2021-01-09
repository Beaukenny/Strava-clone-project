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
    const [inEditWorkout, setInEditWorkout] = useState(false);

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

        if (path.length === 5 && path[1] === 'users' && path[3]==='workout') {
            setInEditWorkout(true);
        };

        if (!init) {
            getPhotos();
            setInit(true)
        }

    }, [tileData]);

    const getPhotos = async(e) => {

        const photoArray = await getAllPhotos(workout_id);

        if (!photoArray.errors) {
            let td = [];

            for (let i = 0; i < photoArray.length; i++) {
                td.push(photoArray[i].photoUrl)
            }
            setTileData(td)
        } else {
            setErrors(photoArray.errors);
        }

    }
    const handleOpenDropZone = (e) => {
        setDropZoneOpen(true)
    }

    const handleCloseDropZone = (e) => {
        setDropZoneOpen(false)
    }
    const handleDroppedFile = async (file) => {
        //setDropZoneOpen(false)
    }


    const handleOnSave = async (file) => {
        setDropZoneOpen(false)
        const form_data = new FormData();
        for (let i=0; i < file.length; i++) {
            form_data.append('image', file[i]);
        }
        const photo = await addPhoto(form_data, workout_id);

        if (!photo.errors) {
            getPhotos();
        }
    }


if (tileData.length > 0) {

        return (
            <>
            <div className={classes.root} >
                <GridList className={classes.gridList} cols={2.5} style={{justifyContent:"center", width:"75%"}}
                >
                     {tileData.map( (url, index) => {
                         return (
                            <GridListTile key={index} style={{width:"100px", height:"150px"}}>
                                <img src={url} alt={"Workout "}  />
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
