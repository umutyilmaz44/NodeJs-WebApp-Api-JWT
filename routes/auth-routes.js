const express = require('express');

const { loginView, loginPost, logoutPost, registerView, registerPost } = require('../controllers/authController');
const router = express.Router();

router.get('/login', loginView);
router.post('/login', loginPost);
router.post('/logout', logoutPost);

router.get('/register', registerView);
router.post('/register', registerPost);

module.exports = {
    routes: router
}