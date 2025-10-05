const express = require('express');
const router = express.Router();
const {
    createUser,
    fetchAllUser,
    getSingleUser,
    UpdateUser,
    deleteUser
} = require('../controller/user')
// User Add Data // add data
router.post('/user',createUser );
// User get Data
router.get('/user',fetchAllUser);
// User Get Data By ID 
router.get('/user/:id',getSingleUser);
// User Update By ID
router.patch('/user/:id',UpdateUser);

// DELETE  User Data
router.delete('/user/:id' , deleteUser);

module.exports = router;
