
const express = require('express');

const { userProfileView } = require('../controllers/userProfileController');
const router = express.Router();

router.get('/', userProfileView);

module.exports = {
    routes: router
}