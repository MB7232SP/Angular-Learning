import { flowModel } from "./flow.model.js";
export const AddData = async (payload)=>{
    try {
     const dataPre =  await flowModel.findOne({clientId:payload.clientId});
     if(dataPre){
        payload.UpdatedOn = Date.now();
        await flowModel.findByIdAndUpdate(dataPre._id,payload);
     }else{
        await flowModel.create(payload);
     }
    } catch (error) {
        console.log(error);
    }
}