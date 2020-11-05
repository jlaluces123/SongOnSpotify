import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useAccessToken } from '../hooks/useAccessToken';
import Search from './search';
import { Expire, Alert } from './alert';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!userData) {
            getUserData();
        } else {
            return;
        }
    }, []);

    const getUserData = async () => {
        // https://api.spotify.com/v1/me
        axios
            .get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            .then((response) => {
                setUserData(response.data);
            })
            .catch((err) => console.log('ERROR GET /v1/me', err));
    };

    const addSong = async (e, uri) => {
        e.preventDefault();

        let playlistId = localStorage.getItem('playlist_id');
        console.log(playlistId, uri, accessToken);

        if (accessToken) {
            //  https:stackoverflow.com/questions/60811947/how-to-pass-authorization-token-in-header-to-react-axios-post
            await axios
                .post(
                    `https:api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uri.toString()}`,
                    null,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then((response) => {
                    setStatus('success');
                    setTimeout(() => setStatus(null), 3000);
                })
                .catch((err) => {
                    console.log('ERROR POST /v1/playlists/:id/tracks', err);
                    setStatus('fail');
                    setTimeout(() => setStatus(null), 3000);
                });
        } else {
            console.log('no access token');
        }
    };

    if (userData) {
        return (
            <div className='bg-white px-6 my-6'>
                {status !== null ? (
                    <Expire delay='3000' status={status}>
                        <Alert status={status} />
                    </Expire>
                ) : null}
                <h1 className='font-bold text-2xl capitalize'>
                    Add a song to your playlist
                </h1>
                <span className='text-sm text-gray-600'>
                    Search a song name and select what playlist <br /> you would
                    like to add it to!
                </span>
                <Search addSong={addSong} />
            </div>
        );
    } else {
        return (
            <div className='flex flex-col h-full home items-center justify-center'>
                <h1 className='font-bold my-2 text-2xl text-green-500'>
                    Welcome to Song On Spotify
                </h1>

                <button
                    className='border-2 border-green-400 hover:shadow-lg bg-green-400 duration-200 ease-in-out hover:bg-green-500 hover:border-green-500 hover:text-white px-16 py-2 rounded shadow text-white transition'
                    onClick={() =>
                        (window.location =
                            'http://localhost:3377/api/auth/login')
                    }
                >
                    Sign In
                </button>
            </div>
        );
    }
};

export default Home;
