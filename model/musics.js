const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    hashmp3: {
        type : String,
        required : true,
        unique : true
    }
    
})

module.exports = mongoose.model('Music' ,MusicSchema)