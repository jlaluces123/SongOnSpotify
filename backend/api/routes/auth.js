const express = require('express');
const AuthServices = require('../../services/auth');
const config = require('../../config');

const router = express.Router();

router.get('/login', async (req, res, next) => {
    console.log('Logging In...');

    try {
        let authService = new AuthServices(config.spotifyClientID);
        await authService.authorize();
        console.log('Authorize Endpoint Completed');
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

module.exports = router;
