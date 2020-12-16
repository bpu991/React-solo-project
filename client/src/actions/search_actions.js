import { searchConstants } from "../constants/search_constants";

export const setSearch = (search) => {
    return {
        type: searchConstants.SET_SEARCH,
        search
    };
};

const searchUsers = (searchInput) => async (dispatch) => {

    const res = await fetch(`/api/search/${searchInput}`)
    if (res.ok) {
        const search = await res.json();
        dispatch(setSearch(search))
    }
}

export default searchUsers