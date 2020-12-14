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

export const getComments = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${photoId}`)
    
    if (res.ok) {
        const comments = await res.json();
        console.log(comments, '=======!!!!')
        dispatch(getComment(comments));
    }
}

export const postComment = (formData) => async (dispatch) => {
    console.log('test');
    const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    });
    console.log(res)
    debugger
    if (res.ok) {
        const comment = await res.json();
        console.log(comment)
        dispatch(setComment(comment))
    }
}