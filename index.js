const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const router = require('./routes/user');

const app = express();
app.use(express.json());
// Connection
mongoose.connect('mongodb://127.0.0.1:27017/task')
.then(()=>console.log('Database is connected'))
.catch((err)=>console.log(err));

const UserRoutes = require('./routes/user');
const TaskRoutes = require('./routes/task');


app.use(UserRoutes);
app.use(TaskRoutes);










// running server port
const port = process.env.PORT || 4040;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
});