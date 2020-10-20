const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', authMiddleware.authorize(), (req, res, next) => {
    console.log('Authorization complete.')
    next();
});

router.get('/callback', authMiddleware.getAccessToken(), (req, res, next) => {      
    if (req.accessToken) {
        console.log('token found')
        res.redirect('https://google.com')
        res.end();
    }       
});

module.exports = router;
