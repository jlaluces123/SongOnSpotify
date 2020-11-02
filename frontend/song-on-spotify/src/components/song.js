import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAccessToken } from '../hooks/useAccessToken';

const Song = ({ artists, name, images, uri }) => {
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    const addSong = async (e) => {
        e.preventDefault();

        let playlistId = localStorage.getItem('playlist_id');
        console.log(playlistId, uri, accessToken);

        if (accessToken) {
            //  https:stackoverflow.com/questions/60811947/how-to-pass-authorization-token-in-header-to-react-axios-post
            await axios
                .post(
                    `https:api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uri.toString()}`,
                    null,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then((response) => {
                    console.log('ADDING Song Response', response);
                })
                .catch((err) =>
                    console.log('ERROR POST /v1/playlists/:id/tracks', err)
                );
        } else {
            console.log('no access token');
        }
    };

    // return (
    //     <div className='song-container'>
    //         <div className='track-data'>
    //             {/* Picture and Data goes here */}
    //             <img
    //                 src={images[1].url}
    //                 srcSet={`
    //                      ${images[1].url} ${images[1].width}w,
    //                      ${images[2].url} ${images[2].width}w
    //                  `}
    //                 sizes={`
    //                      (max-width: 600px) ${images[2].width}px, ${images[1].width}px
    //                  `}
    //                 alt='Track Art'
    //             />

    //             <div className='track-text'>
    //                 <h4>{name}</h4>
    //                 <span>{artists}</span>
    //             </div>
    //         </div>

    //         {/* Add button goes here */}
    //         <button onClick={(e) => addSong(e)}>Add +</button>
    //     </div>
    // );

    return (
        <div className='border-b-2 flex justify-between items-center py-4'>
            <div className='flex flex-row'>
                <img
                    src={images[1].url}
                    srcSet={`
                         ${images[1].url} ${images[1].width}w,
                         ${images[2].url} ${images[2].width}w
                    `}
                    sizes={`
                        (max-width: 600px) ${images[2].width}px, ${images[1].width}px
                    `}
                    alt='Track Art'
                />

                <div className='track-text'>
                    <h4>{name}</h4>
                    <span>{artists}</span>
                </div>
            </div>

            <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                ></path>
            </svg>
        </div>
    );
};

export default Song;
