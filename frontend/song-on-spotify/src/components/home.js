import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!userData) {
            getUserData();
        } else {
            return;
        }
    }, []);

    const getUserData = () => {
        console.log(window.location.search);
        let accessToken = queryString.parse(window.location.search); // Grabs access token from URL

        if (!accessToken) return;

        console.log(accessToken.access_token);

        // https://api.spotify.com/v1/me
        axios
            .get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken.access_token,
                },
            })
            .then((response) => {
                setUserData(response.data);
            })
            .catch((err) => console.log('ERROR GET /v1/me', err));
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

                <button
                    onClick={() =>
                        (window.location =
                            'http://localhost:3377/api/auth/login')
                    }
                >
                    Login
                </button>
            </div>
        );
    }
};

export default Home;
