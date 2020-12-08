import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { explorePage } from '../actions/explore_actions';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
        height: 1000,
    },
}));

const ExplorePage = () => {
    const explore = useSelector(state => state.exploreReducer)
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(explorePage())
    }, [dispatch])


    // return(
    //     <main>
    //         <h1>
    //             Explore page
    //         </h1>
    //         {explore.photos.map(photo => <img key={photo.id} src={photo.url} />)}
    //     </main>
    // )
    return (
        <div className={classes.root}>
            <GridList cellHeight={320} className={classes.gridList} cols={5}>
                {explore.photos.map((photo) => (
                    
                    <GridListTile key={photo} cols={1}>
                        <img src={photo.url} alt={photo.id}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default ExplorePage;