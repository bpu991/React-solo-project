import Cookies from 'js-cookie';

const SET_PROFILE = 'photos/SET_PROFILE' //constant

export const setProfile = (profile) => { // action creator
    return {
        type: SET_PROFILE, //This is the constant
        profile
    };
};

export const profilePage = (userId) => async (dispatch) => { //This is the thunk
    // const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch(`/api/users/${userId}`); //makes the api fetch request
    if (res.ok) {
        const { username, userPhotos } = await res.json();
        dispatch(setProfile({username, userPhotos})) // Dispatch the action creator
    }
}

export default function profileReducer(state = {userPhotos: [] }, action) {
    switch (action.type) { 
        case SET_PROFILE:
            return action.profile;
        default:
            return state;
    }
}

// Creating a slice of state!!!!:
// Make reducer and put into a reducer combiner
// Make a constant for corresponding action
// Make action creator
// Make a thunk if applicable (and dispatch action creator if there is a thunk) (thunks are used for async)
// Else: dispatch action creator inside component