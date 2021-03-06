import {photoConstants} from '../constants/photo_constants'
import Cookies from 'js-cookie';

export const setPhoto = (photos) => {
    return {
        type: photoConstants.SET_PHOTOS,
        photos
    };
};

export const upload = (formData) => async (dispatch) => {
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

export const getSinglePhoto = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}`);
    if (res.ok) {
        const { photo } = await res.json();
        dispatch(setPhoto({ photo }))
    }
}

export const likePost = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/like/${photoId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({photoId})
    });

    if (res.ok) {
        const like = await res.json();
        dispatch(setPhoto(like))
    }
}

export const unlikePost = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/unlike/${photoId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ photoId })
    });

    if (res.ok) {
        const like = await res.json();
        dispatch(setPhoto(like))
    }
}

