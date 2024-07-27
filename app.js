const express = require('express');
const app = express();
const db = require('./config/mongoose-connection');
const dbgr = require('debug');
const expressSession = require("express-session");
const flash = require('connect-flash');

const path = require("path");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const exp = require('constants');
const { isExternal } = require('util/types');
require('dotenv').config();


const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const index = require('./routes/index');
const dotenv = require("dotenv").config();


app.use(
    expressSession({
        resave: false,
        saveUninitialized:false,
        secret:process.env.JWT_KEY,
    })
);

app.use(flash());



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

app.use('/',index);
app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

app.listen(3000);