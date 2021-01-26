const { Router } = require('express');
const router = Router();


const taskCtrl = require('../controller/tasks.controller.js');

// List Tasks
router.get('/', taskCtrl.getAllTasks);


// List Tasks
router.get('/past', taskCtrl.getPastTasks);


// List Tasks
router.get('/daily', taskCtrl.getDailyTasks);



// Create a New Task
router.post('/', taskCtrl.createTask);

// Read Task
router.get('/:id', taskCtrl.getTask);

// Edit Task
router.put('/:id', taskCtrl.editTask);

// Delete Task
router.delete('/:id', taskCtrl.deleteTask);

module.exports = router;