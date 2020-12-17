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
    const [caption, setCaption] = useState('');
    const [photo, setPhoto] = useState('')
    const userPhotos = useSelector(state => state.photoReducer);
    const dispatch = useDispatch();

    if (userPhotos[userPhotos.length - 1]) {
        console.log(userPhotos[userPhotos.length - 1].id)
    }
    
    // const lastPhoto = userPhotos[userPhotos.length - 1]

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // const formData = new FormData() 
    //     const form = new FormData()
    //     form.append('demo_file', e.target.files[0])
    //     form.append('userId', userId)
    //     form.append('caption', caption)
    //     dispatch(upload(form));
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('demo_file', photo)
        formData.append('userId', userId)
        formData.append('caption', caption)
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
                    {/* <form onSubmit={handleSubmit}>
                        <input type='file' onChange={e => setPhoto(e.target.files[0])}/>
                        <input
                            type="text"
                            placeholder="Add a caption..."
                            value={caption}
                            onChange={e => setCaption(e.target.value)} />
                    </form> */}
                    <input
                        type='file'
                        onChange={e => setPhoto(e.target.files[0])}
                    />
                    <input
                        type='text'
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                    
                    {/* <button onClick={(e) => { window.location.href = '/explore' }}>Submit</button> */}
                    {/* <img src={userPhotos[userPhotos.length - 1].url} /> */}
                </>
            )}
                
            {/* <div className='gallery-div' >{array.map(photo => (<div><img className='gallery-photo' alt='dji' src={dji}/>{console.log(photo.url)}</div>))}</div> */}
        </div>
    )
}

export default ImageUpload;