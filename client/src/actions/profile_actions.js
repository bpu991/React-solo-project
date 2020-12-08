import Cookies from 'js-cookie';
import {profileConstants} from '../constants/profile_constants';

export const setProfile = (profile) => { // action creator
    return {
        type: profileConstants.SET_PROFILE, //This is the constant
        profile
    };
};

export const profilePage = (userId) => async (dispatch) => { //This is the thunk
    // const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch(`/api/users/${userId}`); //makes the api fetch request
    if (res.ok) {
        const { username, userPhotos } = await res.json();
        dispatch(setProfile({ username, userPhotos })) // Dispatch the action creator
    }
}