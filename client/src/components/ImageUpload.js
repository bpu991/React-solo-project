import React, { useState } from 'react';
import { upload } from '../store/photos';
import { useSelector, useDispatch } from 'react-redux'
// import dji from './DJI_0005.jpg';
import '../index.css'
const config = {
    bucketName: 'img-bucket-shuttr-react-app',
    // dirName: 'photos', /* optional */
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_ID,
}

const ImageUpload = () => {
    // const [formDatas, setFormData] = useState('');
    const userId = useSelector(state => state.auth.id)
    const userPhotos = useSelector(state => state.photoReducer);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData() 
        formData.append('demo_file', e.target.files[0])
        formData.append('userId', userId)
        dispatch(upload(formData));
    }

    // const upload = async (e) => {
        
    //     // const body = {userId, formData};
    //     console.log(e.target.files[0])
    //     const csrfToken = Cookies.get("XSRF-TOKEN");
    //     const res = await fetch('/api/aws/post_file', {
    //         method: 'POST',
    //         headers: {
    //             // 'Content-Type': 'multipart/form-data',
    //             "CSRF-TOKEN": csrfToken
    //         },
    //         body: formData
    //     });
    //     if(res.ok) {
    //         const { photos } = await res.json();
    //         dispatch(setPhoto(photos))
    //     }
    // }
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