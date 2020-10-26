import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Song from './song';

import { useAccessToken } from '../hooks/useAccessToken';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [chosenSong, setChosenSong] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    const addSong = (e) => {
        e.preventDefault();
        console.log('Adding song to playlist');
    };

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
                setSuggestions(response.data.tracks.items);
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
            {suggestions
                ? suggestions.map((song) => {
                      return (
                          <Song
                              key={song.id}
                              artists={song.artists.map(
                                  (artist) => artist.name
                              )}
                              name={song.name}
                              images={song.album.images}
                              addSong={addSong}
                          />
                      );
                  })
                : 'Loading....'}
        </form>
    );
};

export default Search;
