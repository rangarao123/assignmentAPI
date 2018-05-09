var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fileschema = new Schema({



    date: {"type":Date,"default":Date.now},
    teacherid: { type: String },
    schoolid: { type: String },
    class: { type: String },
 assignment:{type:String}

});
module.exports = mongoose.model('teacherdetails', fileschema);
