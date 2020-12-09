import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import {getSinglePhoto} from '../actions/photo_actions';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 900,
        height: 700,
    },
}));

const SinglePhoto = () => {
    const classes = useStyles();
    const photo = useSelector(state => state.photoReducer.photo)
    const user = useSelector(state => state.photoReducer.photo)
    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSinglePhoto(params.photoId))
    }, [dispatch])

    return (
        <>
            {/* {photo && user && (
                <>
                    <h1>{user.User.username}</h1> 
                    <img src={photo.url} />
                </>
            )} */}
            {photo && user && (
                <>
                    <div className={classes.root}>
                        <GridList cellHeight={700} className={classes.gridList} cols={1}>
                            <GridListTile key={photo.id} cols={1}>
                                <img src={photo.url} alt={photo.id} />
                            </GridListTile>
                        </GridList>
                    </div>
                    <h1 onClick={() => history.push(`/users/${user.User.id}`)}>hello</h1>
                </>
            )}
                
        </>
    )
}

export default SinglePhoto