import React, { useEffect} from 'react';
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { explorePage } from '../actions/explore_actions';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Navbar from './Navbar';
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 2000,
        height: 1500,
    },
}));

const ExplorePage = () => {
    const explore = useSelector(state => state.exploreReducer)
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        dispatch(explorePage())
    }, [dispatch])

    const handleClick = (photo) => {
        return (
            <Redirect to={`/photos/${photo.id}`} />
        )
    }

    // return(
    //     <main>
    //         <h1>
    //             Explore page
    //         </h1>
    //         {explore.photos.map(photo => <img key={photo.id} src={photo.url} />)}
    //     </main>
    // )
    return (
        <>  
            <Navbar />
            <div className={classes.root}>
                <GridList cellHeight={320} className={classes.gridList} cols={5}>
                    {explore.photos.map((photo) => (
                        
                        <GridListTile key={photo.id} cols={1}>
        
                            <img onClick={() => history.push(`/photos/${photo.id}`)} src={photo.url} alt={photo.id}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </>
    );
}

export default ExplorePage;