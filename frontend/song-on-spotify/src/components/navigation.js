import React, { useState, useEffect } from 'react';

const Navigation = ({ loggedIn }) => {
    return (
        <div className='w-full h-16 px-6 flex justify-between items-center border-b-2 border-gray-300'>
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
                    className='text-sm text-blue-500 font-normal hover:text-blue-600 transition duration-300 ease-in-out'
                    href='http://localhost:3377/api/auth/login'
                >
                    Sign In
                </a>
            )}
        </div>
    );
};

export default Navigation;
