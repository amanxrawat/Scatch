const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Scatch');

const ownerSchema = mongoose.Schema({
    fullname : {
        type,String,
        minLenth  : 3,
        trim : true
    },
    email : String,
    password : String,
    products:{
        type:Array,
        default  : []
    },
    Picture: String,
    gstin : String
});

module.exports = mongoose.model('owner',ownerSchema);
