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
    
    if (res.ok) {
        const { user } = await res.json();
        
        dispatch(setUser(user));
    }
}

function loadUser() {
    const authToken = Cookies.get("token");

    if(authToken) {
        try{
            const payload = authToken.split(".")[1];
           
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
           
            const { data } = payloadObj;
            return data;
        } catch (e) {
       
            Cookies.remove("token")
        }
    }
    return {}
}

export default function authReducer(state=loadUser(), action) {
    switch(action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}