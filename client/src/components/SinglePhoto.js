import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import {getSinglePhoto} from '../actions/photo_actions';
const SinglePhoto = () => {
    const photo = useSelector(state => state.photoReducer.photo)
    const params = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSinglePhoto(params.photoId))
    }, [dispatch])

    return (
        <>
            {photo && (
                <img src={photo.url} />
            )}
        </>
    )
}

export default SinglePhoto