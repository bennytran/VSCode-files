// UserProfile.js
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function UserProfile() {
    const { user, logout } = useContext(UserContext);

    if (!user) {
        return <p>No user logged in</p>;
    }

    return (
        <div>
            <p>Logged in as {user.name}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default UserProfile;
