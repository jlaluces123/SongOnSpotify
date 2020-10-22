import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        console.log('Component Did Mount');
    });

    const loginSpotify = () => {
        console.log('SANITY check');
        fetch('http://localhost:3377/api/auth/login')
            .then((response) => response.json())
            .then((data) => (window.location.href = data.url))
            .catch((err) => console.log(err));

        console.log('SANITY check END');
    };

    return (
        <div className='home'>
            <h1>Welcome to Song On Spotify</h1>

            <button onClick={loginSpotify}>Login</button>
        </div>
    );
};

export default Home;
