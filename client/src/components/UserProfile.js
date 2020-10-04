import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { profilePage } from '../store/profile';

const UserProfile = () => {
    const currentUserId = useSelector(state => state.auth.id)
    const user = useSelector(state => state.auth)
    const profile = useSelector(state => state.profileReducer)
    const params = useParams(); // use for route params

    const dispatch = useDispatch();
    useEffect(()=> {
        console.log(profilePage);
        dispatch(profilePage(params.userId))
    }, [dispatch])

    console.log('userProfileRender')
    // if(!profile) {
    //     return null;
    // }
    return (
        <main>
            <h1>{profile.username}</h1>
            {profile.userPhotos.map(photo => <img src={photo}/>)}
        </main>
    )
}

export default UserProfile;