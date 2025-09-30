const mongoose = require('mongoose');
const colors = require('colors');

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/task')
.then(()=>console.log('Database is connected'))
.catch((err)=>console.log(err));

const User = require('./model/User');
const Task = require('./model/Task');


async function db(){

    try {

        const user = new User({
        name: 'Bicir',
        age : 50,
        email : 'Bicir@gmail.com',
        password : '12345',
    })

    await user.save();
    console.log(user); 
    } 
    catch (e) {
        console.log(colors.red.underline.bold(e.message));
    }

}

db();
