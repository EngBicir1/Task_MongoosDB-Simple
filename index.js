const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');

const app = express();
app.use(express.json());
// Connection
mongoose.connect('mongodb://127.0.0.1:27017/task')
.then(()=>console.log('Database is connected'))
.catch((err)=>console.log(err));

const User = require('./model/User');
const Task = require('./model/Task');

/*
    /task Post 
    /task Get
    /task/:id Get
    /task/:id PATCH /UPDATE
    /task/:id DELETE

    /USER Post 
    /USER Get
    /USER/:id Get
    /USER/:id PATCH /UPDATE
    /USER/:id DELETE

*/


// add Data Task
app.post('/task', async (req,res) => {

    try {

        const task = new Task(req.body);
        await task.save();
        return res.status(201).json({ success: true, task});
        
    } catch (e) {
        return res.status(400).json({ success: false, message : e.message });
    }


   
});
// User Add Data // add data
app.post('/user', async (req,res) => {

    try {
        console.log(req.body);
        const user = new User(req.body);
        console.log(user);
        await user.save();
        return res.status(201).json({ success: true, user});
        
    } catch (e) {
        return res.status(400).json({ success: false, message : e.message });
    }

   
});

// Task get Data
app.get('/task',async (req,res)=>{
    const tasks = await Task.find();
    return res.json({success: true, tasks});
});
// User get Data
app.get('/user',async (req,res)=>{
    const user = await User.find();
    return res.json({success: true, user});
});


// Task Get By Data ID 
app.get('/task/:id',async (req,res)=>{
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({
            success: false, 
            message: "User Not found"
        });
    }

    return res.json({success: true, task});
});
// User Get Data By ID 
app.get('/user/:id',async (req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            success: false, 
            message: "User Not found"
        });
    }
    return res.json({success: true, user});
});


// User Update By ID

app.patch('/user/:id',async (req,res)=>{


    try {

        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators: true,
    });
    if(!user){
        return res.status(404).json({
            success: false, 
            message: "User Not found"
        });
    }

    return res.json({success: true, user});
        
    } catch (e) {
         return res.status(400).json({ 
            success: false, 
            message : e.message });

    }

    


});
// Task Update id
app.patch('/task/:id',async (req,res)=>{


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


// DELETE  User Data

app.delete('/user/:id' , async (req, res) => {
    
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false, 
                message: "User Not found"
            });
        }     
        res.json({success: false, user})
    } catch (e) {
         return res.status(400).json({ 
            success: false, 
            message : e.message });
    }
});
//Delete Task Data
app.delete('/task/:id' , async (req, res) => {
    
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



// running server port
const port = process.env.PORT || 4040;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
});


























































// async function db(){

//     try {

//         const user = new User({
//         name: '  Engabdifatah   ',
//         age : 50,
//         email : 'bicirmoha@gmail.com',
//         password : '12345',
//     })

//     await user.save();
//     console.log(user); 
//     } 
//     catch (e) {
//         console.log(colors.red.underline.bold(e.message));
//     }

// }

// db();

