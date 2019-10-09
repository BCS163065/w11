const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
require('./models/db')
const PORT=3000

const employee=require('./controller/employeeController')
const app=express()
app.use(cors())
app.use(bodyparser.json())
app.use('/employee',employee)


app.get('/',function(req,res){
    res.send('hello from server')
})


app.listen(PORT,function(){
    console.log('server is runnning'+PORT)
})