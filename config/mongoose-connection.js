const mongoose = require('mongoose');
const config = require("config");
// const debug = require('debug')("development:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    console.log("connected");
    // debug("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;