const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
require('dotenv/config');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = process.env.jwtTokenSecret;
const secrett2 = process.env.jwtTokenSecret2;

const securePassword = async(password) => {

    try{
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
    } catch (error) {
        res.status(400).send(error.message);
    }
}

router.get('/getall', async(req, res) =>{
    res.send({data : await User.find()});
});

router.post(`/register`, async (req,res)=>{
    const spassword = await securePassword(req.body.password);
    
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: spassword,
    })
    user = await user.save();
    if(!user)
    return res.status(400).send('the user cannot be created!')
    res.send(user);
    // res.json({success: true,
    //     user: { name: user.name, email: user.email, password: user.passwordHash}});
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.passwordHash)){
            const userLimited = await User.findOne({email: req.body.email}).select('id name email ');
            const token = jwt.sign({
                userId : userLimited.id,
                isAdmin: true
            }, secret, {
                expiresIn: '1d'
            });
            res.status(200).send({data : userLimited, token : token});
        }
        else {
            res.status(400).send({ message : "User Invalid"});
        }
    }
    else {
        res.status(400).send({ message : "User not found"});
    }
});

    router.patch('/changepassword', async (req,res, next) => {    
    try {
        const userId = req.body.userId;
        const password = req.body.newpassword;

        const data = await User.findOne({_id:userId});
        
        if(data){
            const newPassword = await securePassword(password);

            const userPassword = await User.findByIdAndUpdate({ _id:userId},{ $set:{
                passwordHash:newPassword
            }});

            return res.status(200).send({ success:true,msg:"Your password has been updated", data: userPassword});
        }else{
            return res.status(200).send({ success:false,msg:"User Id not found"});
        }
    } catch (error) {
        return res.status(400).json({ status: false, error: "Error Occured" });
    }});

    // router.patch('/changepassword/:userId', async (req,res, next) => {    
    // try {
    //     const { newPassword, confirmPassword } = req.body;
    // if (!newPassword || !confirmPassword) {
    //   return res.status(403).json({
    //     error: true,
    //     message:
    //       "Couldn't process request. Please provide all mandatory fields",
    //   });
    // }
    // if (newPassword !== confirmPassword) {
    //     return res.status(400).json({
    //       error: true,
    //       message: "Passwords didn't match",
    //     });
    //   }
    //     const { userId } = req.params;
    //     const password = await securePassword(newPassword); // request for newpassword and hashing it
    //     const userPassword = await User.findByIdAndUpdate({ _id: userId }, { passwordHash: password }, { new: true }); //find the userid and update the newpassword        
    //     console.log("change password"); //to check the console
    //     return res.status(200).json({ status: true, msg: "Your password has been updated", data: userPassword });
    // } catch (error) {
    //     return res.status(400).json({ status: false, error: "Error Occured" });
    // }});

router.delete('/:userId', async (req,res) => {
    User
    .findByIdAndRemove(req.params.userId)
    .exec()
    .then(doc => {
        if (!doc) {return res.status(404).json({ message: "User not found"}); }
        return res.status(200).json({ status: true, msg: "The user has been deleted"});
    })
    .catch(err => next(err));
})

router.get(`/`, async (req,res) => {
  const userList = await User.find()
  if(userList.length==0) {
    res.status(500).json({status: false, message : "No data found", "errCode" : "0001"});
    return;
  }
  res.send(userList);
});

router.post(`/`, (req,res) => {
  const user = new User ({
    name: req.body.name,
    image: req.body.image,
    countInsta
  });
  res.send(user);
});

module.exports = router;