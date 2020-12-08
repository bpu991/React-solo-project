import { photoConstants } from '../constants/photo_constants'

export default function photoReducer(state = [], action) {
    switch (action.type) {
        case photoConstants.SET_PHOTOS:
            return action.photos;
        default:
            return state;
    }
}