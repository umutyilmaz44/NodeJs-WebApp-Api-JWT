const express = require('express');

const { iconsView } = require('../controllers/iconsController');
const router = express.Router();

router.get('/', iconsView);

module.exports = {
    routes: router
}