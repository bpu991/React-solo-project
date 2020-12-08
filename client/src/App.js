import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core/CssBaseline';
import UserList from './components/UsersList';
import LandingPage from './components/LandingPage';
import Pages from './pages/Pages';
import { Redirect } from 'react-router-dom';
import ExplorePage from './components/ExplorePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/Signup';
import UserProfile from './components/UserProfile';
import ImageUpload from './components/ImageUpload';

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
                {/* <Route path="/users">
                    <UserList />
                </Route> */}

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
              <PrivateRoute needLogin={props.needLogin} path="/users/:userId" component={UserProfile} />
              <PrivateRoute needLogin={props.needLogin} path="/upload" component={ImageUpload} />
                    
                
            </Switch>
    </BrowserRouter>
  );
}

// const mapStateToProps = state => {
//     return {
//         currentUserId: state.auth.id,
//         needLogin: !state.auth.id,
//     };
// }

export default App
// export default connect(mapStateToProps)(App);
