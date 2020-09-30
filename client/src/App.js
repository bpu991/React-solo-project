import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import UserList from './components/UsersList';
import LandingPage from './components/LandingPage';
import Pages from './pages/Pages';
import { Redirect } from 'react-router-dom';
import ExplorePage from './components/ExplorePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/Signup';

function App(props) {

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            rest.needLogin
                ? <Redirect to='/home' />
                : <Component {...props} />
        )} />
    )
  return (
    <BrowserRouter>
        
            <nav>
                {/* <ul>
                    <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeClassName="active">Users</NavLink></li>
                    <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                </ul> */}
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path='/login'>
                      <LoginPage />
                </Route>

                  <Route path='/signup'>
                      <SignUpPage />
                  </Route>
                <Route path='/home'>
                    <LandingPage />
                </Route>
                <PrivateRoute needLogin={props.needLogin} path="/explore" component={ExplorePage} />
                    
                
            </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
    return {
        currentUserId: state.auth.id,
        needLogin: !state.auth.id,
    };
}


export default connect(mapStateToProps)(App);
