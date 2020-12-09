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

    if (userPhotos[userPhotos.length - 1]) {
        console.log(userPhotos[userPhotos.length - 1].id)
    }
    
    // const lastPhoto = userPhotos[userPhotos.length - 1]

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

    return (
        <div>
            {userPhotos && (
                <>
                    <h3>AWS upload</h3>
                    <input
                    type='file'
                    onChange={handleSubmit}
                    />
                    <button onClick={(e) => { window.location.href = '/explore' }}>Submit</button>
                    {/* <img src={userPhotos[userPhotos.length - 1].url} /> */}
                </>
            )}
                
            {/* <div className='gallery-div' >{array.map(photo => (<div><img className='gallery-photo' alt='dji' src={dji}/>{console.log(photo.url)}</div>))}</div> */}
        </div>
    )
}

export default ImageUpload;