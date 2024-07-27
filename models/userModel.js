const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname : {
        type:String,
        minLength : 3,
        trim : true
    },

    email : String,

    password : String,

    cart : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        // in ref collection name comes from other model
    }],
    orders:{
        type:Array,
        default  : []
    },

    contact : Number,

    Picture: String
    
});

module.exports = mongoose.model('user',userSchema);
