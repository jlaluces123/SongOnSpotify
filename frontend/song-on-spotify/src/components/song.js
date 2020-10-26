import React, { useState, useEffect } from 'react';

const Song = ({ artists, name, images, addSong }) => {
    return (
        <div className='song-container'>
            <div className='track-data'>
                {/* Picture and Data goes here */}

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
