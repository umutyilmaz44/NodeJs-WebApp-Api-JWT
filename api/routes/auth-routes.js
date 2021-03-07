const express = require('express');
const router = express.Router({mergeParams: true});

const authController = require('../controllers/authController');

router.post('/token', authController.getToken);
router.get('/refreshtoken', authController.getTokenByRefreshToken);
router.post('/logout', authController.deleteToken);

module.exports = {
    routes: router
}