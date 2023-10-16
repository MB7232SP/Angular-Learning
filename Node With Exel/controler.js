const {model,connect,disconnect, dmodel} = require('./db')
const fs = require('fs');
const writeArray  = (myArray)=>{
  const filename = 'output.js';

// Create a JavaScript file content that assigns the array to a variable
const fileContent = `const myArray = ${JSON.stringify(myArray, null, 2)};`;
try {
  fs.writeFileSync(filename, fileContent, 'utf-8');
  console.log('Array data has been written to');
} catch (error) {
  console.error('Error writing to file:', error);
}
}
const serchDatandReturn = async (IMEIS)=>{
    try {
        await connect();

   
    const data = await model.aggregate([
         {
            $match: {
              IMEI: { $in: IMEIS },
            },
          },
          {
            $sort: {
              IMEI: 1,
              createdAt: -1,
            },
          },
          {
            $group: {
              _id: '$IMEI',
              latestDoc: { $first: '$$ROOT' },
            },
          },
          {
            $replaceRoot: { newRoot: '$latestDoc' },
          },
          {
            $project: {
              IMEI: 1, 
              fieldToInclude: 1, 
              createdAt: 1,
              emergency: 1,
              ignition: 1,
              intBatteryVtg: 1,
              mainInputVtg: 1,
              _id:1
            },
          },
          {
            $lookup: {
              from: 'fotaBatchDevices', // Name of the second collection
              localField: 'IMEI',
              pipeline:[{
                $project:{
                  batchFotaStatus:1,
                  fotabatchId:1,
                  _id:1,
                  firmwareVersion: 1,
                  lastLogin: 1,
                  createdAt: 1,
                  ufw: 1
                },
              },
            ],
              foreignField: 'deviceImei',
              as: 'fotaBatchDevices',
            },
          },
          {
            $unwind: {
              path: '$fotaBatchDevices',
              preserveNullAndEmptyArrays: true
            },
          },
          {
            $sort: { 'fotaBatchDevices.createdAt': -1 },
          },
          {
            $group: {
              _id: '$_id',
              latestLoginPacDoc: { $first: '$$ROOT' }
            },
          },
          {
            $project:{
              _id:0,
              latestLoginPacDoc: 1,
            }
          },
          {
            $lookup:{
            from: 'device', // Name of the second collection
            localField: 'latestLoginPacDoc.IMEI',
            pipeline:[{
              $project:{
                imei:1,
                _id:0,
                firmwareVersion: 1,
                createdAt: 1,
                ufw: 1,
                uid: 1,
              },
            },
          ],
            foreignField: 'imei',
            as: 'devices',
          }
          },
          {
            $addFields: {
              devicedata: { $arrayElemAt: ['$devices', 0] }
            }
          },
          {
            $project:{
              latestLoginPacDoc: 1,
              devicedata: 1
            }
          }
    ])
    await disconnect();
    const rData = requiredData(data);
      return rData;
    } catch (error) {
        console.log(error);
    }
}

function requiredData (data){
      let ModifiedArray = [];
      data.forEach(e => {
        const status = e.latestLoginPacDoc.fotaBatchDevices;
        let date;
        if(status){
          date = e.latestLoginPacDoc.fotaBatchDevices.createdAt;
        }
         const obj = {};
          if( status && date > e.devicedata.createdAt && e.latestLoginPacDoc.fotaBatchDevices.ufw){
             obj.ufw = e.latestLoginPacDoc.fotaBatchDevices.ufw;
          }else {
            obj.ufw = e.devicedata.ufw || "";
          }
          obj.uid = e.devicedata.uid.toString();
          obj.imei = e.latestLoginPacDoc.IMEI.toString();
          if( status && date > e.devicedata.createdAt && e.latestLoginPacDoc.fotaBatchDevices.firmwareVersion){
             obj.firmwareVersion = e.latestLoginPacDoc.fotaBatchDevices.firmwareVersion
          }else{
            obj.firmwareVersion = e.devicedata.firmwareVersion || "";
          }
          if(status && e.latestLoginPacDoc.fotaBatchDevices.lastLogin){
            const {formattedDate,formattedTime} = dateformate(e.latestLoginPacDoc.fotaBatchDevices.lastLogin);
            obj.LastLoginDate = formattedDate;
            obj.LastLoginTime = formattedTime;
          }else{
            obj.LastLoginDate = "";
            obj.LastLoginTime = "";
          }
          if(status && e.latestLoginPacDoc.fotaBatchDevices.fotabatchId){
            obj.batchId = e.latestLoginPacDoc.fotaBatchDevices.fotabatchId;
          }else{
            obj.batchId = "";
          }
          if(status && e.latestLoginPacDoc.fotaBatchDevices.batchFotaStatus){
            obj.fotaStatus = e.latestLoginPacDoc.fotaBatchDevices.batchFotaStatus;
          }else{
            obj.fotaStatus = "";
          }
        obj.mainInputVtg = e.latestLoginPacDoc.mainInputVtg || "";
        obj.intBatteryVtg = e.latestLoginPacDoc.intBatteryVtg || "";
        obj.emergency = e.latestLoginPacDoc.emergency || "";
        obj.ignition = e.latestLoginPacDoc.ignition || "" ;
        ModifiedArray.push(obj);
      });
     return ModifiedArray;
}

function dateformate(originalDate){
const date = new Date(originalDate);
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = String(date.getFullYear());
const formattedDate = `${day}/${month}/${year}`;
const hours = String(date.getUTCHours()).padStart(2, "0");
const minutes = String(date.getUTCMinutes()).padStart(2, "0");
const seconds = String(date.getUTCSeconds()).padStart(2, "0");
const formattedTime = `${hours}:${minutes}:${seconds}`;
 return {
  formattedDate,
  formattedTime
 }
}

module.exports = {
    serchDatandReturn
}