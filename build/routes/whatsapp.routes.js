const {
  Router
} = require('express');

const router = Router();

const messageCtrl = require('../controller/messages.controller.js'); // List Services
//router.get('/', messageCtrl.getServices);
// Create a New Message


router.post('/', messageCtrl.createService); // Read Service
//router.get('/:id', messageCtrl.getService);
// Edit Service
//router.put('/:id', messageCtrl.editService);
// Delete Service
//router.delete('/:id', messageCtrl.deleteService);

module.exports = router;