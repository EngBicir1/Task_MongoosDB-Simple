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

app.post('/task', async (req,res) => {

    try {

        const task = new Task(req.body);
        await task.save();
        return res.status(201).json({ success: true, task});
        
    } catch (e) {
        return res.status(400).json({ success: false, message : e.message });
    }


   
})

// User Add Data

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

   
})



app.get('/task',async (req,res)=>{
    const tasks = await Task.find();
    return res.json({success: true, tasks});
})
app.get('/user',async (req,res)=>{
    const user = await User.find();
    return res.json({success: true, user});
})



const port = process.env.PORT || 4040;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})




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

