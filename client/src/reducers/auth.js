import { userConstants } from "../constants/user_constants"
import { loadUser } from "../actions/user_actions";

export default function authReducer(state = loadUser(), action) {
    switch (action.type) {
        case userConstants.SET_USER:
            return action.user;
        default:
            return state;
    }
}