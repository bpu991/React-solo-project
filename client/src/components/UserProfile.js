import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const currentUserId = useSelector(state => state.auth.id)
    const user = useSelector(state => state.auth)
    const params = useParams();
    console.log(currentUserId);
    console.log(params.userId);
    return (
        <main>
            {Number.parseInt(params.userId) === currentUserId ? <h1>Current User {`${user.username}`}</h1> : <h1>Not Current User</h1>}
        </main>
    )
}

export default UserProfile;