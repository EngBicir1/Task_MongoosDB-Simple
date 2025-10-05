const User = require('../model/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req,res) => {
    try {

        const user = new User(req.body);
        await user.save();

        return res.status(201).json({ success: true, user});
        
    } catch (e) {
        return res.status(400).json({ success: false, message : e.message });
    }
}

exports.fetchAllUser = async (req,res)=>{
    const user = await User.find();
    return res.json({success: true, user});
}

exports.getSingleUser = async (req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            success: false, 
            message: "User Not found"
        });
    }
    return res.json({success: true, user});
}


exports.UpdateUser = async (req,res)=>{
    try {
        
        const user = await User.findById(req.params.id);
        const keys = Object.keys(req.body);

        if(!user){
            return res.status(404).json({
                success: false, 
                message: "User Not found"
            });
        }

        for(let key of keys){
            user[key] = req.body[key];
        }
        await user.save();

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
}



exports.deleteUser = async (req, res) => {
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
}
