const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    
        "name": String,
        "designation": String,
        "salary": String,
        "department": String,
        "contactNumber": String,
        "cnicNumber": String,
        "email": String,
        "userName": String,
        "password": String,
        "cnicPicture": String,
        "shift": String,
        "joiningDate": String
},{
    versionKey:false
});
module.exports=mongoose.model('user'/*ya user kya hay */,userSchema,'Employees');