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
module.exports = {
    model,
    connect,
    disconnect,
    dmodel
}


