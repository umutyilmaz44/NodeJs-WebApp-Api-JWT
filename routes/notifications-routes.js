const express = require('express');

const { notificationsView } = require('../controllers/notificationsController');
const router = express.Router();

router.get('/', notificationsView);

module.exports = {
    routes: router
}