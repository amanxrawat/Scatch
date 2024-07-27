const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");

// router.use(cookieParser());


module.exports.registerUser = async (req, res )=>{
    try{
        let{email,password,fullname}=req.body;

        let user = await userModel.findOne({email:email});
        if(user) return res.status(401).send("user already exits pls login to your previous accout");

        bcrypt.genSalt(10,function(err,salt){
            if(err) res.send(err.message);
            bcrypt.hash(password,salt, async function(err,hash){
                let user = await userModel.create({
                    email,
                    password:hash,
                    fullname,
                });

                let token = generateToken(user);
                res.cookie("token",token);
                res.send('user created successfully ');
            })
        })

        
    }
    catch(err){
        res.send(err.message);
    }
};


module.exports.loginUser = async function (req ,res){
    let {email , password } = req.body;

    let user = userModel.findOne({email:email});
    if(!user) return res.send(" email or password incorrect ");
    
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie('token',token);
        }
        else{
            return res.send("email or password incorrect");
        }
    })
    
}

module.exports.logout = function(req,res){
    res.cookie("token","");
    res.redirect("/");

}