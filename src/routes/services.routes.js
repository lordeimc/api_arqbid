const { Router } = require('express');
const router = Router();


const serviceCtrl = require('../controller/services.controller.js');

// List Services
router.get('/', serviceCtrl.getServices);

// Create a New Service
router.post('/', serviceCtrl.createService);

// Read Service
router.get('/:id', serviceCtrl.getService);

// Edit Service
router.put('/:id', serviceCtrl.editService);

// Delete Service
router.delete('/:id', serviceCtrl.deleteService);

module.exports = router;