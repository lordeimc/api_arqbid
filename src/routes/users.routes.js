const { Router } = require('express');
const router = Router();


const userCtrl = require('../controller/users.controller.js');

// List Users
router.get('/', userCtrl.getUsers);

// Create a New User
router.post('/', userCtrl.createUser);

// Read User
router.get('/:id', userCtrl.getUser);

// Edit User
router.put('/:id', userCtrl.editUser);

// Delete User
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;