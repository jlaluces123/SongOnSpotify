import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [chosenSong, setChosenSong] = useState(null);

    const suggestSongs = (e) => {
        e.preventDefault();
        console.log(window.location.search);
        let accessToken = queryString.parse(window.location.search); // Grabs access token from URL

        if (!accessToken) return;

        axios
            .get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: 'Bearer ' + accessToken.access_token,
                },
                params: {
                    q: searchTerm,
                    type: 'track',
                },
            })
            .then((response) => {
                console.log(response);
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
