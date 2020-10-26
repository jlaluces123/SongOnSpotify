import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import { useAccessToken } from '../hooks/useAccessToken';

const Playlists = () => {
    const [playlists, setPlaylists] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    useEffect(() => {
        if (!playlists) getPlaylists();
    }, []);

    const getPlaylists = () => {
        axios
            .get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            .then((response) => {
                console.log(response.data.items);
                setPlaylists(response.data.items);
            })
            .catch((err) => console.log('ERROR GET /v1/me/playlists', err));
    };

    if (playlists) {
        return (
            <select
                name='playlists'
                id='playlists'
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                value={selectedPlaylist}
            >
                {playlists.map((item) => {
                    return (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
        );
    } else {
        return <span>Getting Playlists...</span>;
    }
};

export default Playlists;
