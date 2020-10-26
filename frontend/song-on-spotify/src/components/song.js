import React, { useState, useEffect } from 'react';

const Song = ({ artists, name, images, addSong }) => {
    return (
        <div className='song-container'>
            <div className='track-data'>
                {/* Picture and Data goes here */}
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

            {/* Add button goes here */}
            <button onClick={(e) => addSong(e)}>Add +</button>
        </div>
    );
};

export default Song;
