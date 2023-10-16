const { default: mongoose } = require("mongoose");


const deviceSchema = mongoose.Schema({
'fotaPercentage': Number,
'ufw': String,
"createdAt": String,
'updatedAt':String,
'createdon':String,
'oepartno':String,
'uid':String,
'imei':String,
'iccid':String,
'location':String,
'bootstrapexpdate':String,
"firmwareVersion":String,
'ec20Version':String,
'hardwareVersion':String,
'tcuteststatus':String,
'modelName':String
})

const devicemodel = mongoose.model('device',deviceSchema,'device');
module.exports = {
    devicemodel
}