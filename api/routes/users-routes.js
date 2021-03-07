const express = require('express');
const router = express.Router({mergeParams: true});

const userController = require('../controllers/userController');

router.get('/:id', userController.findById);
router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.put('/psw/:id', userController.updatePassword); 

module.exports = {
    routes: router
}