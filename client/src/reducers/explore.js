import { exploreConstants } from "../constants/explore_constants"

export default function exploreReducer(state = { photos: [] }, action) {
    switch (action.type) {
        case exploreConstants.SET_EXPLORE:
            return action.explore;
        default:
            return state;
    }
}