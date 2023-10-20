const mongoose = require('mongoose');

const connect = async ()=>{
    try {
      await  mongoose.connect('mongodb://127.0.0.1:27017/accolade4GProd?');
      console.log('database connected');
    } catch (error) {
        console.log(error,'some error happned');
    }
}
const disconnect = async ()=>{
    try {
      await mongoose.connection.close(); 
      console.log('connection closed successfully'); 
    } catch (error) {
       console.log(error); 
    }
}
const schema = mongoose.Schema({
    data:String
});
const deviceSchema = mongoose.Schema({
    data:String
});
const dmodel = mongoose.model('device',deviceSchema,'device');
const model = mongoose.model('loginpackets',schema,'loginpackets');


const DeleteLoginPacketsNow = async (imei)=>{
   try {
      const alldocs = await model.find({IMEI:imei}).sort({createdAt:-1}).lean();
      let deleteId = alldocs.map(el=>el._id);
      deleteId = deleteId.slice(100);
      await model.deleteMany({ _id: { $in: deleteId } });
      console.log('loginPackets deleted successfully');
   } catch (error) {
      console.log(error);
   }
}

const DeleteLoginPackets = async()=>{
    try {
        await connect();
        let imeis = await dmodel.find({}, 'imei').lean();
        let start = 0;
        imeis = imeis.map(el=>el.imei);
        const myInterval = setInterval(async()=>{
        const Imes = imeis.slice(start,start+3000);
         if(start>=imeis.length){
            await disconnect();
            clearInterval(myInterval);
         }else{
            const beforedeleteLoginPackets = await model.aggregate([
                {
                    $match: {
                      IMEI: { $in: Imes },
                    }
                },
                {
                    $project:{
                        _id:0,
                        IMEI: 1
                    }
                },
                {
                    $group: {
                      _id: '$IMEI', // Group by the "imei" field
                      count: { $sum: 1 } // Count the number of documents in each group
                    }
                }
            ]);     
            for(let i = 0; i<beforedeleteLoginPackets.length; i++){
                if(beforedeleteLoginPackets[i].count>100){
                    await DeleteLoginPacketsNow(beforedeleteLoginPackets[i]._id);
                }
            }
            start+=3000;
         }
        },60*5*1000)
    } catch (error) {
        
    }
}

DeleteLoginPackets();