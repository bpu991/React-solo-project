import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { explorePage } from '../store/explore';
const ExplorePage = () => {
    const explore = useSelector(state => state.exploreReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(explorePage())
    }, [dispatch])

    return(
        <main>
            <h1>
                Explore page
            </h1>
            {explore.photos.map(photo => <img key={photo.id} src={photo.url} />)}
        </main>
    )
}

export default ExplorePage;