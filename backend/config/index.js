let dotenv = require('dotenv');

const envFound = dotenv.config();

if (envFound.error) throw new Error('Could not find .env file');

module.exports = {
    port: process.env.PORT,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
};
