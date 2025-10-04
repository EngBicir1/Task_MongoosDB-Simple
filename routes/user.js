const express = require('express');
const router = express.Router();
const User = require('../model/User');

// User Add Data // add data
router.post('/user', async (req,res) => {

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

// User get Data
router.get('/user',async (req,res)=>{
    const user = await User.find();
    return res.json({success: true, user});
});

// User Get Data By ID 
router.get('/user/:id',async (req,res)=>{
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
router.patch('/user/:id',async (req,res)=>{


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

// DELETE  User Data
router.delete('/user/:id' , async (req, res) => {
    
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

module.exports = router;