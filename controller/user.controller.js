const User  = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.showRegisterPage = async (req, res)=>{
    try {
        res.render("register.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
}

exports.registerUser = async (req, res) => {
    try {
        let user  = await User.findOne({email: req.body.email , isDelete : false});
        if(user){
            return res.json({message: "User already register please login"});
        }

        let hashPassword = await bcrypt.hash(req.body.password , 10);
        // console.log(hashPassword , "bcript password");
        user = await User.create({...req.body , password : hashPassword});
        user.save();
        res.redirect("/api/user/login")
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
}


exports.showLoginPage = async (req, res)=>{
    try {
        res.render("login.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
};

exports.loginUser = async(req, res)=>{
    try {
        let user = await User.findOne({email: req.body.email , isDelete : false});
        if(!user){
            return res.redirect("register");
        }
        console.log(user);
        let matchPassword = await bcrypt.compare(req.body.password , user.password);

        if(!matchPassword){
            return res.status(400).json({message : "Email Or Password Not metched...."})
        }
        let token = await jwt.sign({userId : user._id} , process.env.LOGIN_SECRETKEY);
        // console.log(token);
        res.cookie('token', token, { httpOnly: true });
        res.redirect("/api/blog")
        
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"}); 
    }
}