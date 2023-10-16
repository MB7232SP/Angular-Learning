import mongoose from 'mongoose'

const flowSchema = mongoose.Schema({
    OverFlowNum:Number,
    priority:String,
    clientId:String,
    UpdatedOn: {
        type: Date,
        default: Date.now
      },
    CreatedOn: {
        type: Date,
        default: Date.now
    }
    
})

export const flowModel = mongoose.model('flowdata',flowSchema,'flowdata');