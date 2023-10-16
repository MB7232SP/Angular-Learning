const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    IdNumber:Number,
    minSpeed:Number,
    MaxSpeed:Number,
    Price:Number
})

const datamodel = mongoose.model('tcpdata',dataSchema,'tcpdata');
module.exports = {
    datamodel
}