const mongoose = require("mongoose");

const loginmodel = new mongoose.Schema ({
    user_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema'
    }
    
})
 


const otherSchema = new mongoose.model("otherSchema", loginmodel);
module.exports = otherSchema