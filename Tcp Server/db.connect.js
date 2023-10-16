const mongoose = require('mongoose');
const connectdb = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/accolade4GQA?');
        console.log('database connected succesfully');
    } catch (error) {
       console.log(error); 
    }
}
module.exports = {
    connectdb
}