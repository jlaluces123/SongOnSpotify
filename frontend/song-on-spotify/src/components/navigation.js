import React from 'react';

const Navigation = ({ loggedIn }) => {
    return (
        <div className='flex h-16 items-center justify-between md:px-12 md:h-24 md:text-lg px-6 w-full'>
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
                    className='bg-green-400 border-2 border-green-400 md:px-8 md:text-md px-5 py-1 rounded text-white text-xs'
                    href='https://song-on-spotify-backend.herokuapp.com/api/auth/login'
                >
                    Login
                </a>
            )}
        </div>
    );
};

export default Navigation;
