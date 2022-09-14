var mongoose__ = require("mongoose");

var userSchema = new mongoose__.Schema(
    {
        name:String,
        password:String,
        emailId:String,
        phoneNumber:Number,
        solvedQuizs:[
        {id:mongoose__.ObjectId,topic:String,subTopic:String,score:String,answered:Number,totalNumberOfQuestions:Number,status:String}
        ],
        isAdmin:Boolean,
        rank:Number
    }
);

var User = mongoose__.model("user",userSchema);

module.exports = User;