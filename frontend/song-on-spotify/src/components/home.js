import React, {useEffect} from 'react';

const Home = () => {

    useEffect(() => {
        console.log('Component Did Mount');
    });

    const loginSpotify = () => {
        fetch('http://localhost:3377/api/auth/login')  
            .then(res => res.json())
            .then(data => {
                window.location.href = data.url
            })
            .catch(err => console.log(err))   
    }

    return (
        <div className="home">
            <h1>Welcome to Song On Spotify</h1>

            <button onClick={loginSpotify}>Login</button>
        </div>
    );
}
 
export default Home;