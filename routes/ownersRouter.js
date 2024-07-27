const express = require('express');
const router = express.Router();
const ownerModel = require("../models/ownerModel");

if(process.env.NODE_ENV==="development"){
    // console.log(process.env.NODE_ENV);
    router.post('/create',async function(req, res){

        // res.send('inside the development zone');

        let owner = await ownerModel.find()
        // console.log(owner);
        if(owner.length >1) {
            return res.send(504)
            .send("you don't have permission to create a new owner. ");
        }
        else{
            let {fullname,email,password} = req.body;
            console.log(fullname);
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password
            });
            
            res.send(createdOwner);
        }

    });
}

router.get('/',function(req, res){
    res.send("working");
});

router.get('/admin',function(req,res){
    res.render('admin');
})

router.get('/create', function(req,res){
    let success = req.flash("success");
    res.render('createproducts',{success});
})

module.exports = router;