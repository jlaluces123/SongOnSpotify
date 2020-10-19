const express = require('express');
const authServices = require('../../services/authServices');
const router = express.Router();

router.get('/login', (req, res) => authServices.authorize(req, res));
router.get('/callback', (req, res) => authServices.getAccessToken(req, res));

module.exports = router;
