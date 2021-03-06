const config = require('../../config/index');
const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const btoa = require('btoa');
const router = express.Router();

const uri = 'https://song-on-spotify-backend.herokuapp.com/api/auth/callback';
const encodedURI = encodeURIComponent(uri);

const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', async (req, res, next) => {
    console.log('GET /login');
    let scopes =
        'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';

    try {
        res.redirect(
            'https://accounts.spotify.com/authorize?' +
                querystring.stringify({
                    response_type: 'code',
                    client_id: config.spotifyClientID,
                    scope: scopes,
                    redirect_uri: uri,
                })
        );
    } catch (err) {
        throw new Error('GET /login ERROR', err);
    }
});

router.get('/callback', async (req, res, next) => {
    try {
        console.log('GET /callback initiating...');
        let code = req.query.code || null;

        let body = {
            grant_type: 'authorization_code',
            code,
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
                let access_token = response.data.access_token;
                res.redirect(
                    'https://song-on-spotify.netlify.app' +
                        '?access_token=' +
                        access_token
                );
                console.log('GET /callback DONE');
            })
            .catch((err) => console.log('Token Error: ', err));
    } catch (err) {
        console.log('GET /callback ERR', err);
    }
});

module.exports = router;
