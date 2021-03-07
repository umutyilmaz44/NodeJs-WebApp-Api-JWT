const express = require('express');

const { rtlView } = require('../controllers/rtlController');
const router = express.Router();

router.get('/', rtlView);

module.exports = {
    routes: router
}