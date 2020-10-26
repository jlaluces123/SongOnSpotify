import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import { useAccessToken } from '../hooks/useAccessToken';

const Playlists = () => {
    // const [state, dispatch] = useReducer(reducer, initialPlaylist, init)
    const [playlists, setPlaylists] = useState(null);
    const [playlistId, setPlaylistId] = useState(null);
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
                onChange={(e) => {
                    setSelectedPlaylist(e.target.value);
                    let dropdown = document.getElementById('playlists');
                    let id = dropdown.options[dropdown.selectedIndex].id;
                    console.log(id);
                    localStorage.setItem('playlist_id', id);
                }}
                value={selectedPlaylist ? selectedPlaylist : 'Pick a playlist'}
            >
                {playlists.map((item) => {
                    return (
                        <option id={item.id} key={item.id} value={item.name}>
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
