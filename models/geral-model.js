const mongoose = require('mongoose')
mongoose.pluralize(null);
const Schema = mongoose.Schema

const Marg = new Schema(
    {
        id: { type: Number, required: true },
        data: { 
        	TempPH : {type : Number},
        	PH : {type : Number},
        	Redox : {type : Number},
        	TempC4E : {type : Number},
        	Salinity : {type : Number},
        	TDS : {type : Number}
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('nodeGeral', Marg)