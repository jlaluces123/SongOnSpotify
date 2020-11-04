import React from 'react';

const Song = ({ artists, name, images, uri, addSong }) => {
    return (
        <div className='border-b-2 flex justify-between items-center py-4 transition hover:scale-y-1 hover:shadow-lg duration-250 ease-in transform'>
            <div className='flex flex-row w-3/4'>
                <img
                    className='mr-2 rounded-md max-h-img'
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
                    <h4 className='font-semibold'>{name}</h4>
                    <span className='font-thin text-gray-600 text-sm'>
                        {artists}
                    </span>
                </div>
            </div>

            <svg
                className='w-6 h-6 border-2 border-blue-400 text-blue-400 mr-2 rounded-full hover:bg-blue-400 hover:text-white cursor-pointer transition duration-300 ease-in-out'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                onClick={(e) => addSong(e, uri)}
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
