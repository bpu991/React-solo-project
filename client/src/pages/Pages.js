import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './Signup';

export default function Pages() {
    return (
        <>
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignUpPage} />
        </>
    )
}