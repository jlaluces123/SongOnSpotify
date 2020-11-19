import React, { useState, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Navigation from './components/navigation';

const App = () => {
    const [loggedIn, setIsLoggedIn] = useState(false);

    const handleLoggedIn = () => {
        if (window.location.search) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        handleLoggedIn();
    }, []);

    return (
        <div className='App flex flex-col h-screen'>
            <Navigation loggedIn={loggedIn} />

            <main className='h-auto content flex-grow'>
                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </main>
        </div>
    );
};

export default App;
