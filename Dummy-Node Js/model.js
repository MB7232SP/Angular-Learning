const mongoose = require("mongoose");

const aftOtaSchema = mongoose.Schema({
    batchId: { type: Number, unique: true },
    batchName: { type: String },
    batchDescription: { type: String },
    batchDate: { type: Date },
    deviceArray: [{
        "IMEI": { type: String },
    }], 
    submittedCount: { type: Number },
    complitedCount: { type: Number },
    batchOtaStatus: { type: String, default : "notStarted" },
    batchStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});

const otaBatchModel = mongoose.model("fotaBatch", aftOtaSchema,"fotaBatch");
module.exports = {
    otaBatchModel
}