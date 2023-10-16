const { formmodel } = require("./db.model")

const dbcontrol = {
     async getData(){
          try {
           let result = await formmodel.find();
           return {
               status:'success',
               data:result
           }
          } catch (error) {
            console.log(error);
              return{
                status: "error",
                data:[],
                error
              }
          }
     },
     async addData(payload){
        try {
            await formmodel.create(payload);
            return {
                status:'success',
                msg: "data added successfully"
            }
           } catch (error) {
             console.log(error);
               return{
                 status: "error",
                 msg:"somthing went wrong",
                 error
               }
           }
     },
     async deleteData(id){
        try {
           await formmodel.findByIdAndDelete(id);
            return {
                status:'success',
                msg: "data deleted successfully"
            }
           } catch (error) {
             console.log(error);
               return{
                 status: "error",
                 msg:"somthing went wrong",
                 error
               }
           }
     },
     async update(payload){
        try {
            await formmodel.findByIdAndUpdate(payload._id,payload);
             return {
                 status:'success',
                 msg: "data updated successfully"
             }
            } catch (error) {
              console.log(error);
                return{
                  status: "error",
                  msg:"somthing went wrong",
                  error
                }
            }
     }
}

module.exports = {
    dbcontrol
}