const axios = require('axios');
const config = require('../config');
const btoa = require('btoa');

const uri = 'https://song-on-spotify-backend.herokuapp.com/api/auth/callback';
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

    getAccessToken: async (req, res) => {
        let body = {
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri:
                'https://song-on-spotify-backend.herokuapp.com/api/auth/callback',
            client_id: config.spotifyClientID,
            client_secret: config.spotifyClientSecret,
        };

        await axios({
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
            .then((response) => {
                console.log('Returning Token: ', response.data.access_token);
                return response.data.access_token;
            })
            .catch((err) => console.log('Token Error: ', err));
    },
};
