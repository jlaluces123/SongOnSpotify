import React from 'react';

const Navigation = ({ loggedIn }) => {
    return (
        <div className='w-full h-16 px-6 flex justify-between items-center'>
            <h1 className='font-semibold cursor-pointer'>Song On Spotify</h1>

            {loggedIn === true ? (
                <a
                    className='text-sm text-gray-600 font-normal hover:text-black transition duration-300 ease-in-out'
                    href='/'
                >
                    Sign Out
                </a>
            ) : (
                <a
                    className='text-xs border-2 px-5 py-1 rounded bg-green-400 text-white border-green-400'
                    href='https://song-on-spotify-backend.herokuapp.com/api/auth/login'
                >
                    Login
                </a>
            )}
        </div>
    );
};

export default Navigation;
