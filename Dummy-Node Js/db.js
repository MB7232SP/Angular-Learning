const mongoose = require('mongoose');

const connect = async ()=>{
    try {
      await  mongoose.connect('mongodb://127.0.0.1:27017/accolade4GQA?');
      console.log('database connected');
    } catch (error) {
        console.log(error,'some error happned');
    }
}

module.exports = {
    connect
}