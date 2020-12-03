import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAccessToken } from '../hooks/useAccessToken';
import Modal from './modal';

const Playlists = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );

    useEffect(() => {
        console.log('Detected A change in playlists');
    }, [props.playlists]);

    if (props.playlists) {
        return (
            <div className='w-1/2'>
                <label
                    htmlFor='menu-toggle'
                    className='text-sm rounded-lg block cursor-pointer bg-gray-300 text-gray-800'
                    onClick={(e) => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <div className='p-2 flex flex-row items-center justify-between'>
                        <span className='truncate'>
                            {selectedPlaylist
                                ? selectedPlaylist
                                : 'Select Playlist'}
                        </span>
                        <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M19 9l-7 7-7-7'
                            ></path>
                        </svg>
                    </div>
                </label>

                <div
                    className={
                        isOpen
                            ? 'flex z-10 border-2 border-gray-500 max-h-menu overflow-y-scroll mt-4 max-w-xs text-left right-sm text-sm shadow-lg rounded flex-col absolute bg-white'
                            : 'hidden'
                    }
                >
                    {props.playlists.map((item) => {
                        return (
                            <button
                                id={item.id}
                                key={item.id}
                                value={item.name}
                                className='text-left flex items-center border-b px-4 py-4 hover:bg-green-400 hover:text-white rounded'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedPlaylist(e.target.value);
                                    localStorage.setItem(
                                        'playlist_id',
                                        e.target.id
                                    );
                                    setIsOpen(false);
                                }}
                            >
                                {item.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return <span>Getting Playlists...</span>;
    }
};

export default Playlists;
