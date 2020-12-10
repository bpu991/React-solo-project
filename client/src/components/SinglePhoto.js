import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import {getSinglePhoto} from '../actions/photo_actions';
import { postComment, getComments } from '../actions/comment_actions';
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
    const comments = useSelector(state => state.commentReducer)
    const currentUser = useSelector(state => state.authReducer)
    const [content, setContent] = useState("");
    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSinglePhoto(params.photoId))
        dispatch(getComments(params.photoId))
    }, [dispatch])

    const handleSubmit = (e) => {
        const form = {
            content,
            photoId: photo.id,
            userId: currentUser.id
        }
        dispatch(postComment(form));
    };
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
                        
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={content}
                                onChange={e => setContent(e.target.value)} />
                        </form>
                    </div>
                    <h1 onClick={() => history.push(`/users/${user.User.id}`)}>hello</h1>
                </>
            )}
            {/* {comments && (
                comments.map(comment => {
                    <div>{comment.content}</div>
                })
            )} */}
                
        </>
    )
}

export default SinglePhoto