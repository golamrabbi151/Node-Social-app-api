const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app =express();

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

 mongoose.connect('mongodb://localhost:27017/social', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection
db.on('error',(err)=>console.log(err.message))
db.once("open",()=>console.log("DB Connection Successful"))
const port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("app is running")
})
