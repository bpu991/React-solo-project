import Cookies from 'js-cookie';

const SET_PHOTOS = 'photos/SET_PHOTOS'

export const setPhoto = (photos) => {
    return {
        type: SET_PHOTOS,
        photos
    };
};

export const upload = (formData) => async(dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch('/api/aws/post_file', {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            "CSRF-TOKEN": csrfToken
        },
        body: formData
    });
    // const data = res.json()
    if (res.ok) {
        const { photos } = await res.json();
        dispatch(setPhoto(photos))
    }
}

export default function photoReducer(state = [], action) {
    switch (action.type) {
        case SET_PHOTOS:
            return action.photos;
        default:
            return state;
    }
}