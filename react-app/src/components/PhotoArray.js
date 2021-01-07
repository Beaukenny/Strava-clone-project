import React, { useState, useEffect } from 'react';
import { Button, GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getAllPhotos } from '../services/photos';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import  { addPhoto } from '../services/photos'
const PhotoArray = ( props ) => {
    const [workout_id, setWorkout_id] = useState(1);
    const [tileData, setTileData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [init, setInit] = useState(false);
    const [dropZoneOpen, setDropZoneOpen] = useState(false);

    console.log("dropZoneOpen:  ", dropZoneOpen);

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
        if (!init){
        const getPhotos = async(e) => {
            const photoArray = await getAllPhotos(workout_id);
            if (!photoArray.errors) {
                photoArray.map( (photo) => {
                    const td = {
                        img: photo,
                        author: 'Author',
                        cols: 2,
                    }
                    tileData.push(td);
                    setTileData(tileData)

                });
            } else {
                setErrors(photoArray.errors);
            }
            console.log("tileData: ", tileData);
            setInit(true)
            setWorkout_id(props.workout_id);
        }
        getPhotos();
    }

    }, []);

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
        const form_data = new FormData();
        form_data.append('image', file[0]);
        const photo = await addPhoto(form_data, 2);
         if (!photo.errors) {
            //... remap photos with new data
         } else {
            //post error message
        }
        setDropZoneOpen(false)
    }

    if (!init && tileData.length === 0 ) {
        return null;
    } else {
        return (
            <>
            <div className={classes.root} >
                <GridList className={classes.gridList} cols={2.5} style={{justifyContent:"center", width:"75%"}}
                >
                    {tileData.map((tile) => (
                        <GridListTile key={tile.img} style={{width:"100px", height:"150px"}}>
                            <img src={tile.img} alt={tile.title}  />
                        </GridListTile>
                    ))}
                </GridList>
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
            </div>
            </>
        );
                }
}

export default PhotoArray;
