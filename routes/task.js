const express = require('express');
const router = express.Router();

const {
    storeTask,
    fetchAllTask,
    getSingleTask,
    UpdateTask,
    deleteTask
} = require('../controller/task')

// add Data Task
router.post('/task',storeTask)
// Task get Data
router.get('/task',fetchAllTask);
// Task Get By Data ID 
router.get('/task/:id', getSingleTask);
// Task Update id
router.patch('/task/:id', UpdateTask);


//Delete Task Data
router.delete('/task/:id',deleteTask);

module.exports = router;
