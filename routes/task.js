const express = require('express');
const router = express.Router();
const Task = require('../model/Task');
// add Data Task
router.post('/task', async (req,res) => {
    try {

        const task = new Task(req.body);
        await task.save();
        return res.status(201).json({ success: true, task});   
    } catch (e) {
        return res.status(400).json({ success: false, message : e.message });
    }
});

// Task get Data
router.get('/task',async (req,res)=>{
    const tasks = await Task.find();
    return res.json({success: true, tasks});
});


// Task Get By Data ID 
router.get('/task/:id',async (req,res)=>{
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({
            success: false, 
            message: "User Not found"
        });
    }

    return res.json({success: true, task});
});

// Task Update id
router.patch('/task/:id',async (req,res)=>{


    try {

        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators: true,
    });
    if(!task){
        return res.status(404).json({
            success: false, 
            message: "User Not found"
        });
    }

    return res.json({success: true, task});
        
    } catch (e) {
         return res.status(400).json({ 
            success: false, 
            message : e.message });

    }

    


});


//Delete Task Data
router.delete('/task/:id' , async (req, res) => {
    
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({
                success: false, 
                message: "User Not found"
            });
        }     
        res.json({success: false, task})
    } catch (e) {
         return res.status(400).json({ 
            success: false, 
            message : e.message });
    }
});

module.exports = router;
