import React, { useState } from 'react';
import { login } from '../store/auth';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import '../log-in.css';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const currentUserId = useSelector(state => state.auth.id)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
       e.preventDefault();
       dispatch(login(username, password));    
    };
    
    
    if (currentUserId) return <Redirect to='/explore' />

    return (
        // <form className='login-form'>
        //     <label>
        //         Username
        //         <input 
        //             type='text' 
        //             name='username' 
        //             value={username}
        //             onChange={(e)=> setUsername(e.target.value)}
        //         />
        //     </label>
        //     <label>
        //         Password
        //         <input
        //             type='password'
        //             name='password'
        //             value={password} 
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //     </label>
        //     <button onClick={handleSubmit} type='submit'>Log in</button>
        // </form>
        <form className="login-form" action="javascript:void(0);">
            
            <div className='login-card'>
                <h1>Login</h1>
                <div className="form-input-material">
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder=" " autocomplete="off" className="form-control-material" required />
                    <label for="username">Username</label>
                </div>
                <div className="form-input-material">
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder=" " autocomplete="off" className="form-control-material" required />
                    <label for="password">Password</label>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn-login btn-login-primary btn-login-ghost">Login</button>
            </div>
        </form>
    )
}

export default LoginPage;

// import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';

// const SET_USER = 'auth/SET_USER'

// const setUser = (user) => {
//     return {
//         type: SET_USER,
//         user
//     };
// };
// function LoginPanel({ updateUser, currentUserId }) {
//     const [username, setUsername] = useState('demo-lition');
//     const [password, setPassword] = useState('password');
//     const dispatch = useDispatch()

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const res = await fetch('/api/session', {
//             method: 'put',
//             headers: {
//                 "Content-Type": 'application/json',
//                 "XSRF-TOKEN": Cookies.get('XSRF-TOKEN')
//             },
//             body: JSON.stringify({ username, password })
//         });
//         res.data = await res.json();
//         if (res.ok) {
//             dispatch(setUser(res.data));
//         }
//         return res;
//     };

//     const updateUsername = e => {
//         setUsername(e.target.value);
//     };

//     const updatePassword = e => {
//         setPassword(e.target.value);
//     };

//     if (currentUserId) {
//         return <Redirect to="/" />;
//     }
//     return (
//         <main classNameName="centered middled">
//             <form onSubmit={handleSubmit}>
//                 <input type="text"
//                     placeholder="Email"
//                     value={username}
//                     onChange={updateUsername} />
//                 <input type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={updatePassword} />
//                 <button type="submit">Login</button>
//             </form>
//         </main>
//     );
// }
// export default LoginPanel;

// const login = (username, password) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/session', {
//             method: 'put',
//             headers: {
//                 "Content-Type": 'application/json',
//                 "XSRF-TOKEN": Cookies.get('XSRF-TOKEN')
//             },
//             body: JSON.stringify({ username, password })
//         });
//         res.data = await res.json();
//         if (res.ok) {
//             dispatch(setUser(res.data));
//         }
//         // return res; 
//     };
// };
