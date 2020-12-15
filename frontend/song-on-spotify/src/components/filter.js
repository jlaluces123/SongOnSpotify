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

    const handleOpen = (e) => {
        e.preventDefault();

        return setOpen(!open);
    };

    const [open, setOpen] = useState(false);

    return (
        <div className='w-full'>
            <button
                onClick={(e) => handleOpen(e)}
                className='flex flex-row focus:outline-none justify-end p-2 rounded-full w-full'
            >
                <span className='border-gray-700 flex flex-row focus:outline-none items-center justify-center leading-9 outline-none text-md tracking-wide'>
                    Filters{' '}
                    <svg
                        className={
                            open === true
                                ? `pl-1 ml-1 w-4 h-4 transform duration-150 rotate-180`
                                : `pl-1 ml-1 w-4 h-4 transform duration-150`
                        }
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
                <div className='absolute z-50 bg-white border h-md p-4 right-sm rounded-lg shadow-lg w-64'>
                    <span>Search for:</span>
                    <div className='flex flex-col pl-4 pt-2'>
                        {searchTypes.map((type) => {
                            return (
                                <button
                                    key={type}
                                    value={type}
                                    onClick={(e) => props.handleFilterSelect(e)}
                                    className={
                                        props.filters.includes(type)
                                            ? 'focus:outline-none text-indigo-600 bg-indigo-200 group leading-6 font-semibold capitalize flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200'
                                            : 'focus:outline-none group leading-6 font-semibold capitalize flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200'
                                    }
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Filter;
