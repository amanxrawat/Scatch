const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/productmodel');



router.get('/',function(req, res){
    res.send("working");
});


router.post('/create',upload.single("image"),async function(req,res){
    let{name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
    try{
        let product = await productModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        
        req.flash("success","product created successfully");
        res.redirect('/owners/create');
    }
    catch(err){
        res.send(err.message);
    }
    
});

// router.get('/create',function(req,res){
//     let success = req.flash("success");
//     res.render('createproducts',{success});
// })
module.exports = router;