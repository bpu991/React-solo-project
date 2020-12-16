import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import searchUsers from "../actions/search_actions";
// import { getAllLandlords } from "../actions/landlord_actions";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        maxHeight: 100,
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    
}));

const Search = () => {
    const classes = useStyles();
    const [input, setInput] = useState('')
    const suggestions = useSelector(state => state.searchReducer.results)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getAllLandlords())
    // }, [dispatch])

    const handleInput = async (e) => {
        setInput(e.target.value)
        dispatch(searchUsers(e.target.value))
    }

    return (
        <>
            <div className="search-bar">
                <input className="searchbar-input" type="search" name="search" onChange={handleInput} value={input} id="search" placeholder="Search" autocomplete="off" required />
                <div className="search-btn" >
                    {/* {suggestions.map(suggestion => (
                        <Card className={classes.root} square={true}>
                            <div className='search-suggestion'>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary">
                                        <Link href={`/users/${suggestion.id}`}>
                                            {suggestion.results.username}
                                        </Link>
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    ))} */}
                    {suggestions && (suggestions.map(suggestion => (
                        <Link href={`/users/${suggestion.id}`}>{suggestion.username}</Link>
                    )))}
                </div>
            </div>

        </>
    );
}

export default Search