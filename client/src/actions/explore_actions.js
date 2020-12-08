import { exploreConstants } from "../constants/explore_constants"
import Cookies from 'js-cookie';

export const setExplore = (explore) => {
    return {
        type: exploreConstants.SET_EXPLORE,
        explore
    };
};
export const explorePage = () => async (dispatch) => {
    // const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch(`/api/photos`);
    if (res.ok) {

        const { photos } = await res.json();
        // console.log(photos)
        dispatch(setExplore({ photos }))
    }
}