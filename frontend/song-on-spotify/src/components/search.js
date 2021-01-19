import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Song from './song';

import { useAccessToken } from '../hooks/useAccessToken';
import Playlists from './playlists';
import Filter from './filter';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    const [filters, setFilters] = useState([]);
    const searchTypes = [
        'album',
        'artist',
        'playlist',
        'track',
        'show',
        'episode',
    ];

    useEffect(() => {
        suggestSongs(null);
    }, [searchTerm]);

    // useEffect(() => {
    //     // A filter was added
    //     suggestSongs(filters);
    // }, [filters]);

    const suggestSongs = (optionalArg) => {
        let typeList = '';
        if (searchTerm === '') return;

        // if (optionalArg.length > 0) {
        //     optionalArg.map((arg) => {
        //         typeList += `${arg},`;
        //     });

        //     axios
        //         .get('https://api.spotify.com/v1/search', {
        //             headers: {
        //                 Authorization: 'Bearer ' + accessToken,
        //             },
        //             params: {
        //                 q: searchTerm,
        //                 type: typeList,
        //             },
        //         })
        //         .then((response) => {
        //             setSuggestions(response.data.tracks.items);
        //         })
        //         .catch((err) => console.log('ERROR GET /v1/search', err));
        // }

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

    const handleFilterSelect = async (e) => {
        e.preventDefault();
        console.log('e.target.value: ', e.target.value);
        setFilters([...filters, e.target.value]);
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
                className='flex flex-col mt-5'
                // onSubmit={(e) => suggestSongs(e)}
            >
                <div className='flex flex-row w-full'>
                    <input
                        type='text'
                        className='p-0 w-1/2 border-b-2 border-gray-300 placeholder-gray-600 text-md text-black focus:outline-none focus:shadow-none'
                        placeholder='Enter a song name'
                        autoComplete='off'
                        id='songName'
                        name='songName'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Playlists playlists={props.playlists} />
                </div>
                {/* <Filter
                    filters={filters}
                    handleFilterSelect={handleFilterSelect}
                    searchFilters={searchTypes}
                /> */}
            </form>

            <div className='md:max-h-full max-h-md overflow-y-scroll my-2 transition-all ease-in-out duration-250'>
                {suggestions.length > 0
                    ? suggestions.map((song) => {
                          return (
                              <Song
                                  addSong={props.addSong}
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
