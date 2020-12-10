import {commentConstants} from '../constants/comment_constants';

export default function commentReducer(state = {}, action) {
    switch (action.type) {
        case commentConstants.SET_COMMENTS:
            return action.comments;
        default:
            return state;
    }
}