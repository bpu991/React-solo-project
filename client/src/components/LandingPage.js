import React from 'react';
import LoginPage from './LoginPage';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import '../landingPage.css';
import super8 from '../photos/landing-page-mov.mp4';
const LandingPage = () => {
    const currentUserId = useSelector(state => state.authReducer.id)
    
    if (currentUserId) return <Redirect to='/explore' />
    
    return(
        <main>
            <section className='showcase'>
                
                <div className='video-container'>
                    <video autoPlay muted loop src={super8} type="video/mp4"></video>
                </div>
                <div className='content'>
                    <h2>Share Your Memories.</h2>
                    <button onClick={(e) => { window.location.href = '/login' }}
                        className="btn">Login
                    </button>
                    <button
                        onClick={(e) => { window.location.href = '/signup' }}
                        className="btn">Sign-up
                    </button>
                </div>
                {/* <div className='toolbar'></div>
                <div className='container'>
                    <div className='video-container'>
                        <video autoPlay muted loop id="videoBG">
                            <source src={super8} type="video/mp4" />
                        </video>
                    </div>
                    <button onClick={(e) => {window.location.href = '/login'}} 
                        className="btn effect01">Login
                    </button>

                    <button 
                        onClick={(e) => {window.location.href = '/signup'}}
                        className="btn effect01">Sign-up
                    </button>
                </div>
                <div className='footer'>

                </div> */}
            </section>
        </main>
    )
}

export default LandingPage;