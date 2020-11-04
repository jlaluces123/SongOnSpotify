import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Song from './song';

import { useAccessToken } from '../hooks/useAccessToken';
import Playlists from './playlists';

const Search = ({ addSong }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    useEffect(() => {
        suggestSongs();
    }, [searchTerm]);

    const suggestSongs = () => {
        // e.preventDefault();

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
                setSuggestions(response.data.tracks.items);
            })
            .catch((err) => console.log('ERROR GET /v1/search', err));
    };

    const parseArtists = (arr) => {
        let length = arr.length;

        return arr.map((ele, idx) => {
            if (length === idx + 1) {
                // Last Item
                return ele.name;
            } else {
                return ele.name + ' • ';
            }
        });
    };

    return (
        <div>
            <form
                className='flex flex-row mt-5'
                // onSubmit={(e) => suggestSongs(e)}
            >
                <input
                    type='text'
                    className='w-1/2 border-b-2 border-gray-300 placeholder-gray-600 text-md text-black focus:outline-none '
                    placeholder='Enter a song name'
                    autoComplete='off'
                    id='songName'
                    name='songName'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Playlists />
            </form>

            <div className='max-h-md overflow-y-scroll my-6'>
                {suggestions.length > 0
                    ? suggestions.map((song) => {
                          return (
                              <Song
                                  addSong={addSong}
                                  key={song.id}
                                  artists={parseArtists(song.artists)}
                                  name={song.name}
                                  images={song.album.images}
                                  uri={song.uri}
                              />
                          );
                      })
                    : null}
            </div>
        </div>
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
