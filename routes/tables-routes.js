const express = require('express');

const { tablesView } = require('../controllers/tablesController');
const router = express.Router();

router.get('/', tablesView);

module.exports = {
    routes: router
}