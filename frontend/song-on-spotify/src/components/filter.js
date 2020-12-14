import React, { useState, useEffect } from 'react';

const Filter = (props) => {
    const searchTypes = [
        'album',
        'artist',
        'playlist',
        'track',
        'show',
        'episode',
    ];

    const [open, setOpen] = useState(false);

    return (
        <div className=''>
            <button
                onClick={(e) => setOpen(!open)}
                className='p-2 block rounded-full'
            >
                <span className='flex flex-row items-center justify-center border-b-2 border-gray-500'>
                    Filters{' '}
                    <svg
                        class='pl-1 w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M19 9l-7 7-7-7'
                        ></path>
                    </svg>
                </span>
            </button>
            {open === true ? (
                <div className='py-2 rounded-pg'>
                    <span>Search for:</span>
                    <div>
                        {searchTypes.map((type) => {
                            return <button>{type}</button>;
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Filter;
