import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

const Playlists = () => {
    const [playlists, setPlaylists] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    useEffect(() => {
        if (!playlists) getPlaylists();
    }, []);

    const getPlaylists = () => {
        console.log(window.location.search);
        let accessToken = queryString.parse(window.location.search); // Grabs access token from URL

        if (!accessToken) return;

        axios
            .get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: 'Bearer ' + accessToken.access_token,
                },
            })
            .then((response) => {
                console.log(response.data);
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
