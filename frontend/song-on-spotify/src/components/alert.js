import React, { useState, useEffect } from 'react';

const Expire = (props) => {
    const [isVisible, setIsVisible] = useState(true);
    const [children, setChildren] = useState(props.children);

    useEffect(() => {
        setChildren(props.children);
        setIsVisible(true);
        setTimer(props.delay);
    }, [props.children]);

    const setTimer = (delay) => {
        setTimeout(() => setIsVisible(false), delay);
    };

    return isVisible ? [children] : <span />;
};

const Alert = ({ status }) => {
    if (status === 'success') {
        return (
            <div
                className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
                role='alert'
            >
                <strong className='font-bold'>Hooray!</strong>
                <span className='block sm:inline'>
                    Song was successfully added to your playlist!
                </span>
            </div>
        );
    } else if (status === 'fail') {
        return (
            <div
                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                role='alert'
            >
                <strong className='font-bold'>Uh oh!</strong>
                <span className='block sm:inline'>
                    There was an error adding the song to your playlist!
                </span>
            </div>
        );
    } else {
        return null;
    }
};
export { Expire, Alert };
