const express = require('express');

const { typographyView } = require('../controllers/typographyController');
const router = express.Router();

router.get('/', typographyView);

module.exports = {
    routes: router
}