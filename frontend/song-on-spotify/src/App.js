import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Navigation from './components/navigation';

const App = () => {
    return (
        <div className='App'>
            <header>
                {/* Navigation */}
                <Navigation />
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
