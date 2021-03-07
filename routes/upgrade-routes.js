const express = require('express');

const { upgradeView } = require('../controllers/upgradeController');
const router = express.Router();

router.get('/', upgradeView);

module.exports = {
    routes: router
}