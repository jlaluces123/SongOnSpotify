const config = require('../../config/index');
const axios = require('axios');
const btoa = require('btoa');

const uri = 'http://localhost:3377/api/auth/callback';
const encodedURI = encodeURIComponent(uri);

module.exports = {

    authorize: () => {
        return async (req, res, next) => {
            console.log('axios call....');

            console.log('redirect uri: ', encodedURI);

            axios
                .get(
                    `https://accounts.spotify.com/authorize?client_id=${config.spotifyClientID}&response_type=code&redirect_uri=${encodedURI}`
                )
                .then((response) => {
                    res.status(200).json({ url: response.request.res.responseUrl });
                    next();
                })
                .catch((err) => console.log('Authorize Error: ', err));
        }
    },

    getAccessToken: () => {

        return async (req, res, next) => {        
            let body = {
                grant_type: 'authorization_code',
                code: req.query.code,
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
                    req.accessToken = response.data.access_token;                                      
                    next();            
                })
                .catch((err) => console.log('Token Error: ', err));
        }
    },
}