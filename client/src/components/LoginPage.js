import React, { useState } from 'react';
import { login } from '../actions/user_actions';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import '../css-styles/log-in.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from "@material-ui/core/TextField";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import loginPhoto from "../photos/login-2.jpg"
import film from '../photos/film-icon.png';
import camera from '../photos/camera-icon.png';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        height: 500,
    },
    media: {
        height: 200,
    },
});

const LoginPage = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const currentUserId = useSelector(state => state.authReducer.id)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
       e.preventDefault();
       dispatch(login(username, password));    
    };
    
    
    if (currentUserId) return <Redirect to='/explore' />

    return (
        <div className='login-page-container'>
            <div className='login-page-col-1'>

            </div>
            <div className='login-page-col-2'>
                
                <div className='col-2-row-1'>
                    {/* <img src={film} /> */}
                    <img src={camera} />
                </div>
                <div className='col-2-row-2'>
                    <form className="login-form" action="javascript:void(0);">
                        <div className='login-card'>
                            <h1>Login</h1>
                            <div className="form-input-material">
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    id="username" 
                                    placeholder=" " 
                                    autocomplete="off" 
                                    className="form-control-material" 
                                    required />
                                
                                
                            </div>
                            <div className="form-input-material">
                                <input className='signup-input' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder=" " autocomplete="off" className="form-control-material" required />
                                
                            </div>
                            <button onClick={handleSubmit} type="submit" className="btn-login btn-login-primary btn-login-ghost">Login</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
        
    )
}

export default LoginPage;

