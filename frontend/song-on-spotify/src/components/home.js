import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useAccessToken } from '../hooks/useAccessToken';
import Search from './search';
import Modal from './modal';
import { Expire, Alert } from './alert';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [playlists, setPlaylists] = useState(null);

    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!userData) {
            getUserData();
            getPlaylists();
        } else {
            return;
        }
    }, []);

    useEffect(() => {
        console.log('User Data: ', userData);
    }, [userData]);

    const getPlaylists = () => {
        axios
            .get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            .then((response) => {
                console.log('GET v1/me/playlists COMPLETE');
                setPlaylists(response.data.items);
            })
            .catch((err) => console.log('ERROR GET /v1/me/playlists', err));
    };

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
                    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uri.toString()}`,
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
            <div className='w-full bg-white px-6 my-6'>
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

                <Search playlists={playlists} addSong={addSong} />
                {userData ? (
                    <Modal
                        user_id={userData.id}
                        getPlaylists={getPlaylists}
                        token={accessToken}
                    />
                ) : null}
            </div>
        );
    } else {
        return (
            <div className='flex-grow px-6 flex flex-col h-full home items-baseline justify-center md:px-12'>
                <h1 className='font-bold leading-snug md:text-5xl text-4xl'>
                    Song On <br />
                    Spotify
                </h1>
                {/* Line */}
                <hr className='bg-black h-0 md:bg-black md:w-1/4 my-6 w-full' />
                <p className='font-light leading-relaxed mb-2 md:text-xl text-sm'>
                    Create playlists and add songs to <br /> them faster than
                    ever.
                </p>
                <button
                    className='bg-black md:px-16 md:py-4 md:text-xl mt-2 px-10 py-2 rounded-full text-white'
                    onClick={() =>
                        (window.location =
                            'https://song-on-spotify-backend.herokuapp.com/api/auth/login')
                    }
                >
                    Start Now
                </button>
            </div>
        );
    }
};

export default Home;

// onClick={() =>
// (window.location =
// 'https://song-on-spotify-backend.herokuapp.com/api/auth/login')
// }
