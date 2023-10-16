const { datamodel } = require("./data.modal");


const SaveData = async(data)=>{
    try {
        await datamodel.create(data); 
       return "data saved succesfully" 
    } catch (error) {
        console.log(error);
        return "somthing went wrong"
    }
}
module.exports = {
    SaveData
}