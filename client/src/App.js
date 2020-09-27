import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserList from './components/UsersList';
import configureStore from './store/configureStore';
import Pages from './pages/Pages';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    window.store = store;
}
function App() {

  return (
    <BrowserRouter>
        <Provider store={store}>
            <nav>
                <ul>
                    <li><NavLink to="/" activeClass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeClass="active">Users</NavLink></li>
                    <li><NavLink to="/login" activeClass="active">Login</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path='/login'>
                      <Pages />
                </Route>

                <Route path="/">
                    <h1>My Home Page</h1>
                </Route>
            </Switch>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
