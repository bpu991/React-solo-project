import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/Signup';

export default function Pages() {
    return (
        <>
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignUpPage} />
        </>
    )
}