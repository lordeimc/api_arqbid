const {
  Router
} = require('express');

const router = Router();

const ganttCtrl = require('../controller/gant.controller.js'); // List Tasks


router.get('/', ganttCtrl.getGraphics); // Create a New Task

router.post('/', ganttCtrl.saveNewTask); // Read Task

router.get('/:id', ganttCtrl.getTasks); // Edit Task

router.put('/:id', ganttCtrl.updateTask); // Delete Task

router.delete('/:id', ganttCtrl.deleteTask);
module.exports = router;