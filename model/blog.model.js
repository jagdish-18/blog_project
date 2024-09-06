const mongoose = require('mongoose');

const blogSchema  = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    date : {
        type : Date,
        default : Date.now
    }
},
{
    versionKey: false
}
);


module.exports = mongoose.model("blogs", blogSchema);