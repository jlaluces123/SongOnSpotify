import React, { useEffect, useState } from 'react';

const Home = () => {
    const [userData, setUserData] = useState(false);

    useEffect(() => {});

    const loginSpotify = () => {
        console.log('SANITY check');
        fetch('http://localhost:3377/api/auth/login')
            .then((response) => response.json())
            .then((data) => (window.location.href = data.url))
            .catch((err) => console.log(err));

        console.log('SANITY check END');
    };

    if (userData) {
        return (
            <div className='home'>
                <h1>Welcome back!</h1>
            </div>
        );
    } else {
        return (
            <div className='home'>
                <h1>Welcome to Song On Spotify</h1>

                <button onClick={loginSpotify}>Login</button>
            </div>
        );
    }
};

export default Home;
