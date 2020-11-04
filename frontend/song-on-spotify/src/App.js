import React, { useState, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Navigation from './components/navigation';

const App = () => {
    const [loggedIn, setIsLoggedIn] = useState(false);

    const handleLoggedIn = () => {
        if (window.location.search) {
            console.log('Is Logged In');
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        console.log('Checking if user is logged in');
        handleLoggedIn();
    }, []);

    return (
        <div className='App'>
            <header>
                {/* Navigation */}
                <Navigation loggedIn={loggedIn} />
            </header>

            <main className='content'>
                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </main>
        </div>
    );
};

export default App;
