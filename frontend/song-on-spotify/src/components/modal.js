import React, { useState, useEffect } from 'react';
import '../css/custom.css';

const Modal = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [collaborative, setCollaborative] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        console.log('Public Changed: ', isPublic);
    }, [isPublic]);

    useEffect(() => console.log('Collab Changed: ', collaborative), [
        collaborative,
    ]);

    return (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div
                    className='fixed inset-0 transition-opacity'
                    ariaHidden='true'
                >
                    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>

                <span
                    className='hidden sm:inline-block sm:align-middle sm:h-screen'
                    ariaHidden='true'
                >
                    &#8203;
                </span>

                <div
                    className='p-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                    role='dialog'
                    ariaModal='true'
                    ariaLabelledby='modal-headline'
                >
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                        <div className='flex flex-col justify-between'>
                            <h2 className='mb-4 text-2xl font-bold'>
                                Create A Playlist
                            </h2>

                            <div className='flex flex-col'>
                                <label
                                    for='name'
                                    className='block text-sm font-medium text-gray-700 mb-1'
                                >
                                    Playlist Name
                                </label>
                                <input
                                    autoComplete='off'
                                    onChange={(e) => setName(e.target.value)}
                                    type='text'
                                    name='name'
                                    id='name'
                                    className='border border-transparent bg-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md'
                                    placeholder='Morning Drive'
                                />
                            </div>

                            <section className='mt-4 flex flex-row'>
                                <div className='flex flex-col w-1/2'>
                                    <label
                                        htmlFor='collab-switch'
                                        className='block text-sm font-medium text-gray-700 mb-1'
                                    >
                                        Collaborative
                                    </label>
                                    <label
                                        id='collab-switch'
                                        className='switch'
                                    >
                                        <input
                                            type='checkbox'
                                            onClick={(e) =>
                                                setCollaborative(!collaborative)
                                            }
                                        />
                                        <span className='slider round'></span>
                                    </label>
                                </div>

                                <div className='flex flex-col w-1/2'>
                                    <label
                                        htmlFor='public-switch'
                                        className='block text-sm font-medium text-gray-700 mb-1'
                                    >
                                        Make Public
                                    </label>
                                    <label
                                        id='public-switch'
                                        className='switch'
                                    >
                                        <input
                                            type='checkbox'
                                            onClick={(e) =>
                                                setIsPublic(!isPublic)
                                            }
                                        />
                                        <span className='slider round'></span>
                                    </label>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                        <button
                            type='button'
                            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                        >
                            Create Playlist
                        </button>
                        <button
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
};

export default Modal;
