const config = require('../../config/index');
const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const btoa = require('btoa');
const router = express.Router();

const uri = 'http://localhost:3377/api/auth/callback';
const encodedURI = encodeURIComponent(uri);

const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', async (req, res, next) => {
    console.log('GET /login');
    let scopes = 'playlist-read-private playlist-read-collaborative';

    try {
        let authURL =
            'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: config.spotifyClientID,
                scope: scopes,
                redirect_uri: uri,
            });

        return res.status(200).json({ url: authURL });
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
            redirect_uri: 'http://localhost:3377/api/auth/callback',
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
                    'http://localhost:3000' + '?access_token=' + access_token
                );
            })
            .catch((err) => console.log('Token Error: ', err));
    } catch (err) {
        console.log('GET /callback ERR', err);
    }
});

module.exports = router;
