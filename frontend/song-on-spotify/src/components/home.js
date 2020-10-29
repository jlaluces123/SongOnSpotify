import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useAccessToken } from '../hooks/useAccessToken';
import Playlists from './playlists';
import Search from './search';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    useEffect(() => {
        if (!userData) {
            getUserData();
        } else {
            return;
        }
    }, []);

    const getUserData = async () => {
        console.log('Getting user data...');

        // https://api.spotify.com/v1/me
        axios
            .get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            .then((response) => {
                console.log(response.data);
                setUserData(response.data);
            })
            .catch((err) => console.log('ERROR GET /v1/me', err));
    };

    if (userData) {
        return (
            <div className='bg-white px-6 my-6'>
                <h1 className='font-bold text-lg'>Search & Press Enter!</h1>
                <Search />
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
