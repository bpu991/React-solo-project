import { commentConstants } from "../constants/comment_constants"
import Cookies from 'js-cookie';

export const setComment = (comment) => {
    return {
        type: commentConstants.SET_COMMENTS,
        comment
    };
};

export const getComment = (comments) => {
    return {
        type: commentConstants.GET_COMMENTS,
        comments
    };
};

export const numComment = (comments) => {
    return {
        type: commentConstants.NUM_COMMENTS,
        comments
    };
};

export const getComments = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${photoId}`)
    
    if (res.ok) {
        const comments = await res.json();
        dispatch(getComment(comments));
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

export const numComments = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/comments/amount/${photoId}`)
    console.log(res)
    if (res.ok) {
        const comments = await res.json();
        dispatch(numComment(comments));
    }
}