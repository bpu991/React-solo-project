import React, { useEffect, useState, useLocalStorage } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getSinglePhoto, likePost, unlikePost} from '../actions/photo_actions';
import { postComment, getComments, numComments } from '../actions/comment_actions';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Navbar from './Navbar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import right from '../photos/right.png';
import left from '../photos/left.png';
import unlike from '../photos/unlike.png';
import like from '../photos/like.png';
import '../css-styles/single-photo.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 900,
        height: 700,
    },
    button: {
        fontWeight: "500"
    }
}));

const SinglePhoto = () => {
    const classes = useStyles();
    const photo = useSelector(state => state.photoReducer.photo)
    const user = useSelector(state => state.photoReducer.photo)
    const comments = useSelector(state => state.commentReducer.comments)
    const currentUser = useSelector(state => state.authReducer)
    const [content, setContent] = useState("");
    // const [liked, setLiked] = useState(false)
    const [liked, setLiked] = useLocalStorage('liked', false)

    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSinglePhoto(params.photoId))
        dispatch(getComments(params.photoId))
        dispatch(numComments(params.photoId))
    }, [dispatch])

    const handleSubmit = (e) => {
        const form = {
            content,
            photoId: photo.id,
            userId: currentUser.id
        }
        dispatch(postComment(form));
    };

    const handleLike = (e) => {
        setLiked(true)
        dispatch(likePost(photo.id))
    }

    const handleUnlike = (e) => {
        setLiked(false)
        dispatch(unlikePost(photo.id))
    }

    function goLeft() {
        history.push(`/photos/${photo.id - 1}`)
        window.location.reload(false);
    }

    function goRight() {
        history.push(`/photos/${photo.id + 1}`)
        window.location.reload(false);
    }

    function useLocalStorage(key, initialValue) {
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = useState(() => {
            try {
                // Get from local storage by key
                const item = window.localStorage.getItem(key);
                // Parse stored json or if none return initialValue
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                // If error also return initialValue
                console.log(error);
                return initialValue;
            }
        });

        // Return a wrapped version of useState's setter function that ...
        // ... persists the new value to localStorage.
        const setValue = value => {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                // Save state
                setStoredValue(valueToStore);
                // Save to local storage
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                // A more advanced implementation would handle the error case
                console.log(error);
            }
        };

        return [storedValue, setValue];
    }
    return (
        <>  
            <Navbar />
            {photo && user && (
                <div className='single-photo-container'>
                    <div className='photo-container'>
                        <IconButton onClick={goLeft} className={classes.button} size="Large">
                            <img className='left' src={left} />
                        </IconButton>
                        <div className={classes.root}>
                            <GridList cellHeight={700} className={classes.gridList} cols={1}>
                                <GridListTile key={photo.id} cols={1}>
                                    <img src={photo.url} alt={photo.id} />
                                </GridListTile>
                            </GridList>
                        </div>
                        <IconButton onClick={goRight} className={classes.button} size="Large">
                            <img className='right' src={right} />
                        </IconButton>
                    </div>
                    <div className='content-container'>
                        <div className='single-photo-col-2'>
                            <div className='col-2-username'>
                                <h1 onClick={() => history.push(`/users/${user.User.id}`)}>{user.User.username}</h1>
                                    <h3>{photo.caption}</h3>
                                {/* {liked ? (
                                    <img src={like} onClick={handleUnlike} />
                                ) : (
                                        <img src={unlike} onClick={handleLike} />
                                    )}
                                <h3>Likes: {photo.likes}</h3> */}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={content}
                                    onChange={e => setContent(e.target.value)} />
                            </form>
                            {comments && (comments.map(comment => (
                                <>
                                    <h4>{comment.User.username}</h4>
                                    <div>{comment.content}</div>
                                </>
                            )))}
                        </div>
                        <div className='single-photo-col-3'>
                        </div>
                    </div>
                          
                            
                            
                        {/* {comments && (comments.map(comment => (
                            <div>{comment.content}</div>
                        )))} */}
                        
                    
                        
                    
                </div>
            )}                
        </>
    )
}

export default SinglePhoto