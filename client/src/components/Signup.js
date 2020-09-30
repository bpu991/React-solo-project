import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../store/auth';
import { Redirect } from 'react-router-dom';


const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const currentUserId = useSelector(state => state.auth.id)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(firstName, lastName, userName, email, password, confirmPassword));
    };

    if (currentUserId) return <Redirect to='/explore' />
    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name
                <input type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name
                <input type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)} />
            </label>
            <label>
                User Name
                <input type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
                Email
                <input type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Password
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Confirm Password
                <input type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} />
            </label>
            <button type="submit">Sign-up</button>
        </form>
    );
}

export default SignUpPage
