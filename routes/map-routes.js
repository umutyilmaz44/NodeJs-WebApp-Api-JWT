const express = require('express');

const { mapView } = require('../controllers/mapController');
const router = express.Router();

router.get('/', mapView);

module.exports = {
    routes: router
}