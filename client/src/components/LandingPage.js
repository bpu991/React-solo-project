import React from 'react';
import LoginPage from './LoginPage';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const LandingPage = () => {
    const currentUserId = useSelector(state => state.auth.id)
    
    if (currentUserId) return <Redirect to='/explore' />
    
    return(
        <main>
            <h1>This is the LandingPage</h1>
            <button onClick={(e) => {
                // e.preventDefault();
                window.location.href = '/login'}}>Login</button>
            <button onClick={(e) => {
                // e.preventDefault();
                window.location.href = '/signup'}}>Sign-up</button>
        </main>
    )
}

export default LandingPage;