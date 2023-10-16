const { default: mongoose } = require("mongoose");


const formSchema = mongoose.Schema({
    name: String,
    background: String,
    email: String,
    password: String,
    mobile: String,
    rangeInput: Number,
    fav_game: String,
    gender: String,
    textArea: String,
    color: String,
    fileInput: String,
    condition: String,
})

const formmodel = mongoose.model('user_form',formSchema,'user_form');
module.exports = {
    formmodel
}