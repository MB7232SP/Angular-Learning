const { deviceConfig } = require("./deviceCofig.model");
const { otaBatchModel } = require("./model")
const {devicemodel} = require('./device.Modal')
const mongoose = require('mongoose');
const dbcontrol = {
   async agreegationbasedOnId(id){
      try {
        const query = {
            _id: new mongoose.Types.ObjectId(id)
         }
         let data = await otaBatchModel.aggregate([
            {$match:query},
            {
            $lookup: {
              from: "fotaBatchDevices",
              localField: "_id",
              foreignField: "batchRefId",
              as: "fotabatchrefdata"
            }
          },
          {
            $project: {
              fotabatchrefdata: 1 // Include the fotabatchrefdata field
            }
          }      
        ]);
         return data;
      } catch (error) {
          console.log(error);
      }
    },
    async GroupByDeleteStatus(){
      try {
        const data = await otaBatchModel.aggregate([
          {
            $project:{
              deviceArray:0,
              file:0,
            }
          },
          {
            $group:{_id:'$isDeleted', groupedData: { $push: '$$ROOT' }}
          },
        ])  
        return {
          status:'success',
          data,
        }
      } catch (error) {
        console.log(error);
        return {
          status:'error',
          massage:'something went wrong'
        }
      }
    },
    async agreegateThreecollection(){
      try {
        const data = await otaBatchModel.aggregate([
          {
            $project:{
              batchName:1,
              batchDate:1,
              batchDescription:1,
              _id:1
            }
          },
          {
            $lookup:{
              from:'fotaBatchDevices',
              pipeline:[{
                $project:{
                  fotabatchName:1,
                  deviceImei:1,
                  batchRefId:1,
                  _id:1
                },
              },
            ],
              localField:'_id',
              foreignField:'batchRefId',
              as:'secondCollectioData'
            }
          },
          {
            $addFields: {
              secondCollectioData: { $arrayElemAt: ['$secondCollectioData', 0] }
            }
          },
         {
          $lookup: {
            from: 'fotaCompleted',
            pipeline: [
              {
                $project: {
                  imei: 1,
                  govtIp1: 1,
                  createdAt:1,
                  _id: 1
                }
              }
            ],
            localField:'secondCollectioData.deviceImei',
            foreignField:'imei',
            as: 'thirdCollectioData'
          }
         },
         {
          $addFields: {
            thirdCollectioData: { $arrayElemAt: ['$thirdCollectioData', 0] }
          }
        },
          {
            $limit: 10
          },
        ])  
        return {
          status:'success',
          data
        }
      } catch (error) {
        console.log(error);
        return {
          status:'error',
          massage:'somthing went wrong'
        }
         
      }
    },
    async GetDeviceDataByVin(vin){
      try {
        const data = await deviceConfig.aggregate([
          {
            $match :{
              'vinNumber.initialParameters':vin
            }
          },
          {
            $lookup: {
                from:'device',
                localField:'uinNumber.initialParameters',
                foreignField:'uid',
                as:'deviceData'
            }
          },
          {
            $project: {
              deviceData:{ $arrayElemAt: ['$deviceData', 0] },
              vinNumber:1,
              _id:0
            }
          },
          {
            $addFields: {
              // Merge the main data and lookup data into a single object
              vinNum: {
                 vinNum:'$vinNumber.initialParameters'
              }
            }
          },
          {
            $addFields: {
              // Merge the main data and lookup data into a single object
              finalData: {
                $mergeObjects: ['$vinNum', '$deviceData']
              }
            }
          },
          {
            $project: {
              deviceData:0,
              vinNumber:0,
              vinNum:0,
            }
          },
          {
            $replaceRoot: { newRoot: '$finalData' }
          },
          {
            $project:{
              _id:1,
              vinNum:1,
              fotaPercentage:1,
               ufw:1,
              uid:1,
              imei:1,
               iccid:1,
               location:1,
              firmwareVersion:1,
              loggedIntime:1,
            }
          }
        ])
        return {
          status:'success',
          data:data[0]
        }
      } catch (error) {
        console.log(error);
        return {
          status:'error',
          massage:'somthing went wrong'
        }
      }
    },
    async SerchDevice(payload,page,size){
         try {
            const result = await devicemodel.aggregate([
                  {
                    $match: {
                      $or: [
                        { uid: {
                          $regex: payload,
                          $options: 'i'
                        } },
                        { imei: {
                          $regex: payload,
                          $options: 'i'
                        } },
                        { location: {
                          $regex: payload,
                          $options: 'i'
                        } },
                        {iccid: {
                          $regex: payload,
                          $options: 'i'
                        }},
                        {ec20Version: {
                          $regex: payload,
                          $options: 'i'
                        }}
                      ]                
                    }
              
                  },
                  {
                    $sort: {
                      createdon:1
                    }
                  },
                  {
                    $skip: (page-1)*size
                  },
                  {
                    $limit: +size
                  }
            ]);
            return {
              status:'success',
              data:result
            }
         } catch (error) {
          console.log(error);
          return {
            status:'error',
            massage:'somthing went wrong',
          }  
         }
    }
}
module.exports = {
    dbcontrol
}