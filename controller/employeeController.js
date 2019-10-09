const express = require('express')
const router = express.Router()
const User=require('../models/employeeSchema')
const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')


function verifyToken(req,res,next){
  if(!req.headers.authorization){
     return res.status(401).send('unAuthorized request');
  }
  let token=req.headers.authorization.split(' ')[1]
  if(token==='null'){
    return res.status(401).send('unAuthorized request');
  }
  let payload=jwt.verify(token,'secretKey');
  if(!payload){
    return res.status(401).send('unAuthorized request');
  }
  req.userId=payload.subject;
  next();
}

router.get('/', (req, res) => {
    res.send('from api route');
})


router.post('/login',(req,res)=>{
    let userData=req.body
    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send('invalid email');
            }else{
                if(user.password!==userData.password){
                    res.status(401).send('invalid password');
                }else{
                  let payload={subject:user._id}
                  let token=jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    });
});

//This is Use for POST the Data

/**
 * Example
 * {
        "name": "khan",
        "designation": "Admin",
        "salary": 1,
        "department": "BSEE",
        "contactNumber": "03325505081",
        "cnicNumber": "123-133-124",
        "email": "imran.cust@gmail.com",
        "userName": "imran",
        "password": "mynameisarslan",
        "cnicPicture": "path",
        "shift": "day",
        "joiningDate": "13-1-1998"
    }
 */

router.post('/register',(req,res)=>{
  let userData=req.body;
  let user=new User(userData);
  user.save((error,registeredUser)=>{
      if(error){
          console.log(error);
      }else{
          let payload={subject:registeredUser._id}
          let token=jwt.sign(payload,'secretKey');
          res.status(200).send({token});
      }
  })
})


//This API just retrive All employee Data
router.get('/events'/*,verifyToken*/,(req,res)=>{
   User.find({} , function(err, data){
    if(err)
    {
      console.log(err);
    }
    else
    {
    //console.log(data);
    res.json(data);
    }
  });
});

// this API Use for update the Employee Data this requir id in joson format and all collection data
/* Example:
{
	"id":"5d9cb018cfde380df44be9d9",
	 "newData":{
		"name": "Imran",
        "designation": "Admin",
        "salary": "1000002",
        "department": "BSEE",
        "contactNumber": "03325505081",
        "cnicNumber": "123-133-124",
        "email": "imran.cust@gmail.com",
        "userName": "imran",
        "password": "mynameisarslan",
        "cnicPicture": "path",
        "shift": "day",
        "joiningDate": "13-1-1998"
	 }
}
*/
router.put('/update',(req,res)=>{
  console.log(req.body.id);
 
  var dat=req.body.newData;
  User.findOneAndUpdate({_id:req.body.id},{$set:dat},{upsert:true},function(err,doc){
    if(err)
    {
      console.log(err);
      res.json("Failed to Update");
    }
    else
    {
      res.json("Successfuly Updated");
    }
  });
});


// This is For Delete on basis of id generate by itself mongo like 
/*
Example:
{
	"id":"5d9d60173593f14324df532e"
}
 */
router.delete('/delete'/*,verifyToken*/,(req,res)=>{
  User.deleteMany({_id:req.body.id},function(err){
    if(err)
    {
      res.json("Error");
    }
    else
    {
      res.json("Delete Successfull");
    }
  });  
});



router.get('/special',verifyToken,(req,res)=>{
    let specialEvents = [
        {
          "_id": "1",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(specialEvents)
})
module.exports = router