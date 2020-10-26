import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import { useAccessToken } from '../hooks/useAccessToken';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [chosenSong, setChosenSong] = useState(null);
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    const suggestSongs = (e) => {
        e.preventDefault();

        axios
            .get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
                params: {
                    q: searchTerm,
                    type: 'track',
                },
            })
            .then((response) => {
                console.log(response.data.tracks.items);
            })
            .catch((err) => console.log('ERROR GET /v1/search', err));
    };

    return (
        <form onSubmit={(e) => suggestSongs(e)}>
            <input
                type='text'
                name='songName'
                id='songName'
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
    );
};

export default Search;
