const { Router } = require('express');
const router = Router();

const fileCtrl = require('../controller/files.controller.js');

// List Files
router.get('/', fileCtrl.getAllFiles);

// Create a New File
router.post('/', fileCtrl.createFile);

// Read File
router.get('/:id', fileCtrl.getFile);

// Edit File
router.put('/:id', fileCtrl.editFile);

// Delete File
router.delete('/:id', fileCtrl.deleteFile);

module.exports = router;