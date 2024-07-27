const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const productmodel = require("../models/productmodel");
const userModel = require("../models/userModel");



// const {isLoggedIn} = require("../middlewares/isLoggedIn")



router.get('/', function(req, res){
    let error = req.flash("error");
    res.render('index',{error,loggedin:false});
});


router.get('/shop' , isLoggedIn, async function(req,res ){
    let product = await productmodel.find();
    let success = req.flash('success');
    res.render("shop",{product,success});
});

router.get('/cart' , isLoggedIn, async function(req,res ){
    let user = await userModel.findOne({email:req.user.eamil}).populate('cart');
    res.render("cart",{user});

})

router.get("/addtocart/:id",isLoggedIn, async function(req,res){
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","added to cart");
    res.redirect("/shop");
});


module.exports = router;

