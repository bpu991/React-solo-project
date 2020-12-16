import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom';
import '../css-styles/navbar.css';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import profile from '../photos/profile.png';
import upload from '../photos/upload.png';
import explore from '../photos/explore.png';

const useStyles = makeStyles((theme) => ({
    button: {
        fontWeight: "500"
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const user = useSelector(state => state.authReducer)

    return (
        <div className='navbar-container'>
            <div className='navbar-col-1'>

            </div>
            <div className='navbar-col-2'>

            </div>
            <div className='navbar-col-3'>

            </div>
            <div className='navbar-col-4'>

            </div>
            <div className='navbar-col-5'>
                <IconButton component={NavLink} to={`/explore`} className={classes.button} size="Large">
                    <img className='explore-icon' src={explore} />
                </IconButton>
                
                <IconButton component={NavLink} to={`/upload`} className={classes.button} size="Large">
                    <img className='upload-icon' src={upload} />
                </IconButton>

                <IconButton component={NavLink} to={`/users/${user.id}`} className={classes.button} size="Large">
                    <img className='profile-icon' src={profile} />
                </IconButton>
                {/* <IconButton component={NavLink} to={`/users/${user.id}`} className={classes.button} size="Large">
                    <LocationCityIcon size="Large" />
                </IconButton> */}
            </div>

        </div>
    )
}

export default Navbar;