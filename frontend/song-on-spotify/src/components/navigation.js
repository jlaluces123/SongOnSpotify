import React from 'react';
import Modal from './modal';

const Navigation = ({ loggedIn }) => {
    return (
        <div className='flex h-16 items-center justify-between md:px-12 md:h-24 md:text-lg px-6 mt-4 w-full'>
            <h1 className='font-semibold cursor-pointer'>Song On Spotify</h1>

            {loggedIn === true ? (
                <a
                    className='text-sm text-gray-600 font-normal hover:text-black transition duration-300 ease-in-out'
                    href='/'
                >
                    Sign Out
                </a>
            ) : (
                <div className='align-middle bg-black flex flex-row items-center justify-between p-1 rounded'>
                    <a
                        className='md:px-8 md:text-md px-5 py-1 rounded text-white text-sm'
                        href='https://song-on-spotify-backend.herokuapp.com/api/auth/login'
                    >
                        Get Started
                    </a>
                    <svg
                        class='w-8 h-6 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M17 8l4 4m0 0l-4 4m4-4H3'
                        ></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default Navigation;
