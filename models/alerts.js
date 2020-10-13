const mongoose = require('mongoose')
mongoose.pluralize(null);
const Schema = mongoose.Schema

const Marg = new Schema(
    {
        id: { type: Number, required: true },
        data: { 
        	value : {type : Number},
        	signal : {type : String}
        },
        email: {type: String}
    },
    { timestamps: true }
)

module.exports = mongoose.model('alerts', Marg)
