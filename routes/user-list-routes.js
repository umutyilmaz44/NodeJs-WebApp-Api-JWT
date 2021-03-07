
const express = require('express');

const { userListView } = require('../controllers/userListController');
const router = express.Router();

router.get('/', userListView);

module.exports = {
    routes: router
}