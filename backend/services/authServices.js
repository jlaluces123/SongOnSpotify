const axios = require('axios');
const config = require('../config');
const btoa = require('btoa');

const uri = 'http://localhost:3377/api/auth/callback';
const encodedURI = encodeURIComponent(uri);

module.exports = {
    authorize: async (req, res) => {
        console.log('axios call....');

        console.log('redirect uri: ', encodedURI);

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

        console.log('redirect uri: ', encodedURI);

        console.log('Req.Query: ', req.query);

        let body = {
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: 'http://localhost:3377/api/auth/callback',
            client_id: config.spotifyClientID,
            client_secret: config.spotifyClientSecret,
        };

        console.log(config.spotifyClientSecret);
        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            params: body,
            headers: {
                Authorization:
                    'Basic ' +
                    btoa(
                        config.spotifyClientID +
                            ':' +
                            config.spotifyClientSecret
                    ),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => console.log('Token Response: ', response))
            .catch((err) => console.log('Token Error: ', err));
    },
};
