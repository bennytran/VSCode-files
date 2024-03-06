// Login.js
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

function Login() {
    const [name, setName] = useState('');
    const { login } = useContext(UserContext);

    const handleLogin = () => {
        login(name);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;

