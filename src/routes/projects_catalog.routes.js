const { Router } = require('express');
const router = Router();


const project_CatCtrl = require('../controller/projects_catalog.controller.js');

// List Projects
router.get('/', project_CatCtrl.getProjects);

// Create a New Project
router.post('/', project_CatCtrl.createProject);

// Read Project
router.get('/:id', project_CatCtrl.getProject);

// Edit Project
router.put('/:id', project_CatCtrl.editProject);

// Delete Project
router.delete('/:id', project_CatCtrl.deleteProject);

module.exports = router;