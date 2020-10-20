const express = require('express');
const router = express.Router();

const authServices = require('../../services/authServices');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', authMiddleware.authorize(), (req, res, next) => {
    res.send('Authorization complete. Initiating code-for-token exchange.')
});

router.get('/callback', authMiddleware.getAccessToken(), (req, res, next) => {
    res.send(req.accessToken).redirect('https://localhost:3000/welcome');    
});

module.exports = router;
