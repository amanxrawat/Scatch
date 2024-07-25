const express = require('express');
const app = express();
const db = require('./config/mongoose-connection');

const path = require("path");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const exp = require('constants');
const { isExternal } = require('util/types');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');


app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

app.listen(3000);