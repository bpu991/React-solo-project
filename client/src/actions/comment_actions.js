import { commentConstants } from "../constants/comment_constants"
import Cookies from 'js-cookie';

export const setComment = (comment) => {
    return {
        type: commentConstants.SET_COMMENT,
        comment
    };
};

export const getComments = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${photoId}`)
    if (res.ok) {
        const comment = await res.json();
        dispatch(setComment(comment))
    }
}

export const postComment = (formData) => async (dispatch) => {
    const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    });
    if (res.ok) {
        const comment = await res.json();
        dispatch(setComment(comment))
    }
}