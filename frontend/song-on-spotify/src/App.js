import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Modal from './components/modal';
import Navigation from './components/navigation';
import { useAccessToken } from './hooks/useAccessToken';
import Filter from './components/filter';

const App = () => {
    const [loggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useAccessToken(
        window.location.search
    );
    const [user, setUser] = useState(null);

    const getUserData = async () => {
        // https://api.spotify.com/v1/me
        axios
            .get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((err) => console.log('ERROR GET /v1/me', err));
    };

    const handleLoggedIn = () => {
        if (window.location.search) {
            setIsLoggedIn(true);
            getUserData();
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        handleLoggedIn();
    }, []);

    useEffect(() => {
        console.log('User data: ', user);
    }, [user]);

    return (
        <div className='App flex flex-col h-screen'>
            <Navigation loggedIn={loggedIn} />
            <main className='flex flex-1 h-auto content flex-grow md:mx-16 lg:mx-48'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/test' component={Filter} />
                </Switch>
            </main>
        </div>
    );
};

export default App;
