const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv')
const mongoose = require('mongoose');

//config cors
app.use(cors());

//configure the express to access form data
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//configure dotenv
dotEnv.config({path:"./config/config.env"});

 const hostName = process.env.HOST_NAME ;
 const port = process.env.PORT;


 //configure mongoDB

 mongoose.connect(process.env.MONGO_DB_LOCAL_URL ,{
     useCreateIndex:true,
     useFindAndModify:false,
     useUnifiedTopology:true,
     useNewUrlParser:true
 }).then((response)=> {
    console.log(`connected to mongoDB successfully.....`)
 }).catch((error)=> {
     console.error(error);
     process.exit(1); //stop the node js process if mongodb failed to connect server
 })

 //basic url
 app.get('/',(request,resonse)=> {
     response.status(200).send(`<h2>welcome to Express server</h2>`)
 })

 //configure the router
 app.use('/api',require('./router/productRouter'));

 //listen to port

 app.listen(port,hostName,()=> {
     console.log(`express server is started at http://${hostName}:${port}`)
 })
