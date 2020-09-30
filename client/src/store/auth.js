import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();

const SET_USER = 'auth/SET_USER'

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    };
};

export const login = (username, password) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch("/api/session/login", {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({
            username,
            password
        }),
    });
    const data = await res.json(); // current user info
    console.log(data)
    if (res.ok) {
        dispatch(setUser(data));
    } else {
        throw res;
    }
};

export const signup = (firstName, lastName, userName, email, password) => async dispatch => {
    const csrfToken = Cookies.get("XSRF-TOKEN");

    const res = await fetch('/api/session/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "CSRF-TOKEN": csrfToken // Need for post requests
        },
        body: JSON.stringify({ 
            firstName, 
            lastName, 
            userName, 
            email, 
            password }),
    });
    console.log(res);
    if (res.ok) {
        const { user } = await res.json();
        console.log(user)
        dispatch(setUser(user));
    }
}

function loadUser() {
    console.log('line 62')
    const authToken = Cookies.get("token");
    console.log(authToken)
    if(authToken) {
        try{
            const payload = authToken.split(".")[1];
            console.log(payload);
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            console.log(payloadObj)
            const { data } = payloadObj;
            return data;
        } catch (e) {
            console.log('removing token')
            Cookies.remove("token")
        }
    }
    return {}
}

export default function authReducer(state=loadUser(), action ) {
    switch(action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}