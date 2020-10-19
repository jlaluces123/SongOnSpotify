const axios = require('axios');
const config = require('../config');

module.exports = {
    authorize: async (req, res) => {
        const uri = 'http://localhost:3377/api/auth/callback';
        const encodedURI = encodeURIComponent(uri);

        console.log('axios call....');

        axios
            .get(
                `https://accounts.spotify.com/authorize?client_id=${config.spotifyClientID}&response_type=code&redirect_uri=${encodedURI}`
            )
            .then((response) => {
                console.log(response.request.res.responseUrl);
                res.status(200).json({ url: response.request.res.responseUrl });
            })
            .catch((err) => console.log('Authorize Error: ', err));
    },

    callback: async (req, res) => {
        console.log('callback reached');
    },
};
