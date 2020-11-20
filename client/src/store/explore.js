import Cookies from 'js-cookie';

const SET_EXPLORE = 'photos/SET_EXPLORE'

export const setExplore = (explore) => {
    return {
        type: SET_EXPLORE,
        explore
    };
};

export const explorePage = () => async (dispatch) => {
    // const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch(`/api/explore`);
    if (res.ok) {
        
        const { photos } = await res.json();
        // console.log(photos)
        dispatch(setExplore({ photos }))
    }
}

export default function exploreReducer(state = {photos: []}, action) {
    switch (action.type) {
        case SET_EXPLORE:
            return action.explore;
        default:
            return state;
    }
}