import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserList from './components/UsersList';

import Pages from './pages/Pages';
import { setUser } from './store/auth';
import { useSelector, useDispatch } from 'react-redux';


function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch('/api/session');

            if(res.ok) {
                res.data = await res.json();
                dispatch(setUser(res.data.user));
            }
            setLoading(false);
        }
        loadUser()
    }, [dispatch]);
  return (
    <BrowserRouter>
        
            <nav>
                <ul>
                    <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeClassName="active">Users</NavLink></li>
                    <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path='/login'>
                      <Pages />
                </Route>

                  <Route path='/signup'>
                      <Pages />
                  </Route>

                <Route path="/">
                    <h1>My Home Page</h1>
                </Route>
            </Switch>
    </BrowserRouter>
  );
}

export default App;
