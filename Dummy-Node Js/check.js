const mongoose = require('mongoose');
const { dbconnect } = require('../Database/db');
const schema = mongoose.Schema({
    data: String
})
const devicemodal = mongoose.model('device',mongoose.Schema({
    data: String
}),'device');
const loginpacmodal = mongoose.model('loginpackets',schema,'loginpackets');

const saveLatest100 = async(imei)=> {
   try {
    const docs = await loginpacmodal.find({IMEI:imei}).sort({createdAt:-1}).lean();
    // console.log(docs.length,imei);
    const deleteItemsId = [];
    if(docs.length > 100){
        let index = 100;
        while(index < docs.length){
           deleteItemsId.push(docs[index++]._id);
        }
    }
    if(deleteItemsId.length>0){
       await loginpacmodal.deleteMany({ _id: { $in: deleteItemsId } });
    }
    return {
        total:docs.length
    }
   } catch (error) {
      console.log(error);
   }
}

// 1 – 20 of 6276553 previous
const CheckCollection = async ()=>{
    try {
        await dbconnect();
       const allEmis = await devicemodal.distinct('imei');
    // const allEmis = await devicemodal.find().limit(50).lean();
    // console.log(allEmis);
       let ansarr = [];
       for(let i = 0; i<allEmis.length; i++){
        // console.log(allEmis[i].imei);
        let ans =  await saveLatest100(allEmis[i]);
        ansarr.push(ans);
       }
    console.log(ansarr);
    } catch (error) {
       console.log(error); 
    }
}
CheckCollection(0)

// let skipnum = 0;
// const myInterval = setInterval(async()=>{
//    let res = await CheckCollection(skipnum);
//    skipnum++;
//    if(res){
//     clearInterval(myInterval);
//    }
// },20000);