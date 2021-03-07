const express = require('express');

const authRouter = require('../api/routes/auth-routes');
const usersRouter = require('../api/routes/users-routes');
const router = express.Router();

router.use('/auth', authRouter.routes);
router.use('/users', usersRouter.routes);

module.exports = {
    routes: router
}