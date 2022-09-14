import { RequestHandler,Request,Response } from "express";

require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
var cors =require("cors");
var path = require("path");


var PORT = process.env.PORT || 9000;



const app = express();

app.use(express.json());
app.use(cors());

//mongoDB connection
mongoose.connect(process.env.URI,{useNewUrlParser:true},(err:Error) =>{
    if(err)
        console.log("Error while connecting to database:"+err);
    else
        console.log("conneted to database")
});

//routers
var quizRouter = require("./routes/quizs");
var userRouter = require("./routes/users");

//adding routes
app.use("/quizs",quizRouter);
app.use("/users",userRouter);

if (process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static('frontend/build'));

    app.get('*', (req:Request, res:Response) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
};



//listening on port 80000
app.listen(PORT,() => {
    console.log("Server running on port 8000");
});