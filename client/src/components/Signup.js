import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../actions/user_actions';
import { Redirect } from 'react-router-dom';
import film from '../photos/film-icon.png';
import "../css-styles/signup.css";
const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const currentUserId = useSelector(state => state.authReducer.id)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(firstName, lastName, userName, email, password, confirmPassword));
    };

    if (currentUserId) return <Redirect to='/explore' />
    return (
    
        <div className='signup-page-container'>
            <div className='signup-page-col-1'>

            </div>
            <div className='signup-page-col-2'>

                <div className='signup-col-2-row-1'>
                    <img src={film} />
                    
                </div>
                <div className='signup-col-2-row-2'>
                    <form className="signup-form" action="javascript:void(0);">
                        <div className='signup-card'>
                            <h1>Signup</h1>
                            <div className="form-input-material">

                                <input type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="form-control-material" 
                                    required />
                                {/* <label>First Name</label>  */}
                            </div>
                            <div className="form-input-material">

                                    <input type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="form-control-material" 
                                        required />
                                    {/* <label>Last Name</label> */}
                            </div>
                            <div className="form-input-material">

                                    <input type="text"
                                        placeholder="Username"
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                        className="form-control-material" 
                                        required />
                                    {/* <label>Username</label> */}
                            </div>
                            <div className="form-input-material">

                                    <input type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="form-control-material" 
                                        required />
                                    {/* <label>Email</label> */}
                            </div>
                            <div className="form-input-material">
                                
                                    <input type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="form-control-material" 
                                        required />
                                    {/* <label>Password</label> */}
                            </div>
                            <div className="form-input-material">
                                    <input type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className="form-control-material" 
                                        required />
                                    {/* <label >Confirm Password</label> */}
                            </div>
                            <button onClick={handleSubmit} type="submit" className="btn-login btn-login-primary btn-login-ghost">Login</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        // <div className='login-page-container'>
        //     <div className='login-page-col-1'>

        //     </div>
        //     <div className='login-page-col-2'>

        //         <div className='col-2-row-1'>
                    
        //         </div>
        //         <div className='col-2-row-2'>
        //             <form className="login-form" action="javascript:void(0);">
        //                 <div className='login-card'>
        //                     <h1>Login</h1>
        //                     <div className="form-input-material">
        //                         <input
        //                             type="text"
        //                             name="username"
        //                             value={userName}
        //                             onChange={(e) => setUserName(e.target.value)}
        //                             id="username"
        //                             placeholder=" "
        //                             autocomplete="off"
        //                             className="form-control-material"
        //                             required />

        //                         <label for="username">Username</label>
                                
        //                     </div>
                            
        //                     <div className="form-input-material">
        //                         <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder=" " autocomplete="off" className="form-control-material" required />
        //                         <label for="password">Password</label>
        //                     </div>
        //                     <button onClick={handleSubmit} type="submit" className="btn-login btn-login-primary btn-login-ghost">Login</button>
        //                 </div>
        //             </form>
        //         </div>

        //     </div>
        // </div>
    );
}

export default SignUpPage
