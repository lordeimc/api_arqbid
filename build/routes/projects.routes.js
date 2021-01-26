const {
  Router
} = require('express');

const router = Router();

const projectCtrl = require('../controller/projects.controller.js'); // List Projects


router.get('/', projectCtrl.getProjects); // Create a New Project

router.post('/', projectCtrl.createProject); // Read Project

router.get('/:id', projectCtrl.getProject); // Edit Project

router.put('/:id', projectCtrl.editProject); // Delete Project

router.delete('/:id', projectCtrl.deleteProject);
module.exports = router;