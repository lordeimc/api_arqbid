const { Router } = require('express');
const router = Router();


const contractorCtrl = require('../controller/provider.controller.js');

// List Contractors
router.get('/', contractorCtrl.getContractors);

// Create a New Contractor
router.post('/', contractorCtrl.createContractor);

// Read Contractor
router.get('/:id', contractorCtrl.getContractor);

// Edit Contractor
router.put('/:id', contractorCtrl.editContractor);

// Delete Contractor
router.delete('/:id', contractorCtrl.deleteContractor);

module.exports = router;