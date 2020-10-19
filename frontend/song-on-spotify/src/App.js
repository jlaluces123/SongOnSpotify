import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    loginSpotify = () => {
        fetch('http://localhost:3377/api/auth/login')
            .then((res) => res.json())
            .then((data) => {
                window.location.href = data.url;
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <button onClick={this.loginSpotify}>Login</button>
                </header>
            </div>
        );
    }
}

export default App;
