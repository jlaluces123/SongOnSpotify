import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import Home from './components/home';

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <header>{/* Navigation */}</header>

                <main className='content'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
