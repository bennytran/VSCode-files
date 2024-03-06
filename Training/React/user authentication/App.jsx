// App.js
import React from 'react';
import { UserProvider } from './UserContext';
import Login from './Login';
import UserProfile from './UserProfile';

function App() {
    return (
        <UserProvider>
            <div>
                <h1>Simple User Authentication</h1>
                <Login />
                <UserProfile />
            </div>
        </UserProvider>
    );
}

export default App;

