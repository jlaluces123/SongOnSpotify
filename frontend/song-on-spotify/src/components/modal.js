import React, { useState, useEffect } from 'react';
import '../css/custom.css';

const Modal = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [collaborative, setCollaborative] = useState(false);
    const [description, setDescription] = useState('');

    const [status, setStatus] = useState(null);

    useEffect(() => {
        console.log('Public Changed: ', isPublic);
    }, [isPublic]);

    useEffect(() => console.log('Collab Changed: ', collaborative), [
        collaborative,
    ]);

    const createPlaylist = (e) => {
        e.preventDefault();
        let requestBody = {
            name,
            public: isPublic,
            collaborative,
            description,
        };
        e.preventDefault();
        fetch(`https://api.spotify.com/v1/users/${props.user_id}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                console.log(response);
                setStatus('success');
                setTimeout(() => {
                    setOpen(false);
                }, 2000);
                props.getPlaylists();
            })
            .catch((err) => {
                console.log('ERROR POST /v1/users/user_id/playlists', err);
            });
    };

    if (open === true) {
        return (
            <div className='fixed z-10 inset-0 overflow-y-auto'>
                <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <div
                        className='fixed inset-0 transition-opacity'
                        aria-hidden='true'
                    >
                        <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                    </div>

                    <span
                        className='hidden sm:inline-block sm:align-middle sm:h-screen'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>

                    <div
                        className='p-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='modal-headline'
                    >
                        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                            <div className='flex flex-col justify-between'>
                                <h2 className='mb-4 text-2xl font-bold'>
                                    Create A Playlist
                                </h2>

                                <div className='flex flex-col'>
                                    <label
                                        htmlFor='name'
                                        className='block text-md font-medium text-gray-700 mb-1'
                                    >
                                        Playlist Name
                                    </label>
                                    <input
                                        autoComplete='off'
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        type='text'
                                        name='name'
                                        id='name'
                                        className='input-switch border border-transparent bg-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md'
                                        placeholder='Morning Drive'
                                    />
                                </div>

                                <div className='my-4 flex flex-row w-full items-center justify-between'>
                                    <div className='flex flex-col w-2/3'>
                                        <label
                                            htmlFor='collab-switch'
                                            className='block text-md font-medium text-gray-700 mb-1'
                                        >
                                            Collaborative
                                        </label>
                                        <p className='text-sm text-gray-600'>
                                            Allow other users to team up and add
                                            to the playlist!
                                        </p>
                                    </div>

                                    <label
                                        id='collab-switch'
                                        className='switch'
                                    >
                                        <input
                                            className='switch-input'
                                            type='checkbox'
                                            onClick={(e) =>
                                                setCollaborative(!collaborative)
                                            }
                                        />
                                        <span className='slider round'></span>
                                    </label>
                                </div>

                                <div className='my-4 flex flex-row w-full items-center justify-between'>
                                    <div className='flex flex-col w-2/3'>
                                        <label
                                            htmlFor='public-switch'
                                            className='block text-md font-medium text-gray-700 mb-1'
                                        >
                                            Make Public
                                        </label>
                                        <p className='text-sm text-gray-600'>
                                            Allow other users to search, save,
                                            and play your playlist!
                                        </p>
                                    </div>

                                    <label
                                        id='public-switch'
                                        className='switch'
                                    >
                                        <input
                                            className='switch-input'
                                            type='checkbox'
                                            onClick={(e) =>
                                                setIsPublic(!isPublic)
                                            }
                                        />
                                        <span className='slider round'></span>
                                    </label>
                                </div>

                                <div className='flex flex-col mt-2'>
                                    <label
                                        htmlFor='description'
                                        className='block text-md font-medium text-gray-700 mb-1'
                                    >
                                        Describe Your Playlist
                                    </label>
                                    <textarea
                                        placeholder='For my morning commute to work!'
                                        name='description'
                                        id='description'
                                        className='input-switch text-sm resize rounded-md border border-transparent bg-gray-300 text-gray-600'
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                            <button
                                onClick={(e) => createPlaylist(e)}
                                type='button'
                                className={
                                    status === 'success'
                                        ? 'transition-all duration-300 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
                                        : 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
                                }
                            >
                                {status === 'success'
                                    ? 'Playlist Created!'
                                    : 'Create Playlist'}
                            </button>
                            <button
                                onClick={(e) => setOpen(false)}
                                type='button'
                                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <footer
                onClick={(e) => setOpen(true)}
                className='bg-indigo-400 duration-300 cursor-pointer ease-in-out flex h-12 hover:bg-indigo-600 items-center justify-center mb-auto text-lg text-white transition-all'
            >
                <button onClick={(e) => setOpen(true)}>
                    Create a Playlist
                </button>
            </footer>
        );
    }
};

export default Modal;
