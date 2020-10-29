import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Song from './song';

import { useAccessToken } from '../hooks/useAccessToken';
import Playlists from './playlists';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
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
                setSuggestions(response.data.tracks.items);
            })
            .catch((err) => console.log('ERROR GET /v1/search', err));
    };

    return (
        <form
            className='flex flex-row border-b-2 border-gray-800'
            onSubmit={(e) => suggestSongs(e)}
        >
            <input
                type='text'
                className='w-1/2 placeholder-gray-600 focus:outline-none '
                placeholder='Enter a song name'
                autoComplete='off'
                id='songName'
                name='songName'
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Playlists />
        </form>
    );
};

export default Search;

/* {suggestions
    ? suggestions.map((song) => {
          return (
              <Song
                  key={song.id}
                  artists={song.artists.map(
                      (artist) => artist.name
                  )}
                  name={song.name}
                  images={song.album.images}
                  uri={song.uri}
              />
          );
      })
    : 'Loading....'} */
