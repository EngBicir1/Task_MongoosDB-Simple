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

// running server port
const port = process.env.PORT || 4040;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
});