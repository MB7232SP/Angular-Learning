const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceLoginSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  "55AA": String,
  REQID_LOGIN_MSG_TATA: String,
  RTCL_VERSION_TATA: String,
  Time: Number,
  IMEI: String,
  ICCID: String,
  "UIN Number": String,
  ACCOLADE_FIRMWARE_VERSION: String,
  chesisNo: String,
  firmwareSource: String,
  primaryIp: String,
  primaryPort: String,
  secondaryIp: String,
  secondaryPort: String,
  noOfFuelTank: String,
  primaryTankCap: String,
  primaryTankLen: String,
  primaryTankWidth: String,
  primaryTankHeight: String,
  primaryTankDiameter: String,
  primaryTankType: String,
  primaryTankAFTType: String,
  secondaryTankCap: String,
  secondaryTankLen: String,
  secondaryTankWidth: String,
  secondaryTankHeight: String,
  secondaryTankDiameter: String,
  secondaryTankType: String,
  latitude: String,
  latitudeDir: String,
  longitude: String,
  longitudeDir: String,
  mainInputVtg: String,
  intBatteryVtg: String,
  ignition: String,
  tamper: String,
  emergency: String,
  calibValidFlag: String,
  gpsDataFlag: String,
});
const loginpacmodal = mongoose.model('loginpackets',deviceLoginSchema,'loginpackets');
module.exports = {
    loginpacmodal
}