import React, { useState } from 'react';
import { upload } from '../actions/photo_actions';
import { useSelector, useDispatch } from 'react-redux'
// import dji from './DJI_0005.jpg';
import '../index.css'
const config = {
    bucketName: 'img-bucket-shuttr-react-app',
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_ID,
}

const ImageUpload = () => {
    const userId = useSelector(state => state.authReducer.id)
    const userPhotos = useSelector(state => state.photoReducer);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData() 
        formData.append('demo_file', e.target.files[0])
        formData.append('userId', userId)
        dispatch(upload(formData));
    }

    if(!userPhotos) {
        return null;
    }
    const array = [1, 2, 3, 4, 5, 6, 7]
    return (
        <div>
            <h3>AWS upload</h3>
            <input
            type='file'
            onChange={handleSubmit}
            />
            <button onClick={(e) => { window.location.href = '/explore' }}>Submit</button>
            {/* <div className='gallery-div' >{array.map(photo => (<div><img className='gallery-photo' alt='dji' src={dji}/>{console.log(photo.url)}</div>))}</div> */}
        </div>
    )
}

export default ImageUpload;