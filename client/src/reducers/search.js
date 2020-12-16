import { searchConstants } from '../constants/search_constants'

export default function searchReducer(state = [], action) {
    switch (action.type) {
        case searchConstants.SET_SEARCH: {
            return action.search
        }
        default: {
            return state
        }
    }
}