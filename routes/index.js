var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var winston = require('winston');

var database = require('../config/database');
var College = require('../models/schooldetails');

var util = require('util')

//connecting database
mongoose.connect(database.url, function(err,db)

{
  if(db)
  console.log("connected");
});


/* GET home page. */
router.get('/', function(req, res, next) {


  College.find({},function (err, item) {
          if (err){
        //   res.send('err');
           res.status(500);
         }

  else{
   res.status(200).send(item);
  //console.log(item);
}

}).catch(next);
});







router.post('/post', function(req, res) {


// alternative shortcut


var m=util.inspect(req.body.assignment, false, null)
var school=new College({


        teacherid:req.body.teacherid,
        schoolid:req.body.schoolid,
        class:req.body.class,
        assignment:m


     })
console.log(school)




        school.save(function (err, item) {
                if (err){
                 res.status(500);
               }else {
                 //console.log(item);
res.json("saved succesfully");
 //res.send(item);

}
})
})
             /*College.count({}, function( err, count){

               var sc="B"+count++;
               College.findOneAndUpdate({clgcode:sc.clgcode}, {clgcode:sc}, {upsert:true}, function(err, doc){
           if (err) return res.send(500, { error: err });
           return res.send("succesfully saved");
        });
      });*/










router.put('/api/student/:assignment_id', function(req, res) {
  var m=util.inspect(req.body.assignment, false, null);



 var id = req.params.assignment_id;
 var data = {
   teacherid:req.body.teacherid,
   schoolid:req.body.schoolid,
   class:req.body.class,
    assignment:m


 }
 College.findByIdAndUpdate(id, data, function(err, teacherdetails) {
 if (err)
 {
 res.status(500).json();
 }
else
    {
       res.status(202).json("Successfully! student updated - ");
    }
 });
});




router.delete('/api/student/:_id', function(req, res) {

 console.log(req.params._id);
 var id = req.params._id;
 College.remove({_id : id}, function(err) {
 if (err)
 res.status(500);
 else
  res.status(202).json("Successfully! student deleted - ");
})
});


module.exports = router;
