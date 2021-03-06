import { profileConstants } from '../constants/profile_constants';

export default function profileReducer(state = { userPhotos: [] }, action) {
    switch (action.type) {
        case profileConstants.SET_PROFILE:
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