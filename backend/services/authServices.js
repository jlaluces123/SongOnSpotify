const axios = require('axios');
const config = require('../config');

const uri = 'http://localhost:3377/api/auth/callback';
const encodedURI = encodeURIComponent(uri);

module.exports = {
    authorize: async (req, res) => {
        console.log('axios call....');

        axios
            .get(
                `https://accounts.spotify.com/authorize?client_id=${config.spotifyClientID}&response_type=code&redirect_uri=${encodedURI}`
            )
            .then((response) => {
                res.status(200).json({ url: response.request.res.responseUrl });
            })
            .catch((err) => console.log('Authorize Error: ', err));
    },

    callback: async (req, res) => {
        console.log('callback reached');

        console.log('Req.Query: ', req.query);

        let body = {
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: encodedURI,
            client_id: config.spotifyClientID,
            client_secret: config.spotifyClientSecret,
        };

        axios
            .post('https://accounts.spotify.com/api/token', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization:
                        'Basic ' +
                        btoa(
                            config.spotifyClientID +
                                ':' +
                                config.spotifyClientSecret
                        ),
                },
                body,
            })
            .then((response) => console.log('Token Response: ', response))
            .catch((err) => console.log('Token Error: ', err));
    },
};
