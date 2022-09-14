import { RequestHandler, Router } from "express";
import {quiz} from "./quizs"; 
var User = require("../models/user.model"); 
var Quiz = require("../models/quiz.model"); 
var mongoose = require("mongoose"); 
var passport = require("passport");
var {hashSync,compareSync} = require("bcrypt");
var jwt = require("jsonwebtoken");

var router = Router();

interface user 
{
    _id:string,
    name:string,
    password:string,
    emailId:string,
    phoneNumber:number,
    solvedQuizs:{topic:string,subTopic:string,id:string,score:number,answered:number,totalNumberOfQuestions:number,status:string}[],
    isAdmin:Boolean,
    rank:Number
}



const addUser:RequestHandler =  (req,res,next) => {

    User.findOne({emailId:req.body.emailId})
    .then((user:user) =>{
        if(user)
        {
            res.send(
                {
                    msg:"EmailId already exists",
                    success:false,
                    err:false
                })
        }
        else
        {
            const newUser = new User(
                {
                    name:req.body.name,
                    password:hashSync(req.body.password,10),
                    emailId:req.body.emailId,
                    phoneNumber:req.body.phoneNumber,
                    solvedQuizs:[],
                    rank:1,
                    isAdmin:false
                });
            newUser.save()
            .then(() => res.send(
                {
                    success:true,
                    msg:"Registered successfully",
                    err:false
                }
            ))
            .catch((err:Error) => res.send(
                {
                    success:false,
                    err:err,
                    msg:"Error occured while registering the user."
                })
            );        
        }})
}

const loginUser:RequestHandler = (req,res,next) => {
    
    User.findOne({emailId:req.body.emailId})
    .then((user:user) => {
        console.log("user details"+user)
        if(user==null)
        {
            res.send({
                msg:"User Not Found",
                success:false,
            })
        }
        else
        {
            if(!compareSync(req.body.password,user.password))
            {
                res.send({
                    msg:"Incorrect Password",
                    success:false
                })
            }
            else
            {
                const jwt_payload = {
                    id:user._id,
                    emailId:user.emailId
                } 

                const token = jwt.sign(jwt_payload,"something",{expiresIn:"1d"})
                res.send({
                    msg:"Login success",
                    success:true,
                    token:"Bearer "+token,
                    user:user
                })
            }
        }
    })
    .catch((err:Error) =>{console.log("error:"+err)})
} 

const addQuizToUsersSolvedQuizs:RequestHandler = (req,res,next) => {
    console.log(req.body.userId);

    var answers = req.body.answers;

    Quiz.findById(req.body.quizId)
    .then((quiz:quiz) => {
        var score = 0;
        for(var i=0;i<quiz.questions.length;i++)
        {
            if(quiz.questions[i].correctAnswer === answers[i])
                score += 1;
        }
        var status = "Not Qualified";
        if(score/quiz.numberOfQuestions*100>=quiz.qualifyPercentage)
            status = "Qualified";
        console.log({id:req.body.quizId,topic:quiz.topic,subTopic:quiz.subTopic,answered:req.body.answered,totalNumberOfQuestions:quiz.numberOfQuestions,score:score,status:status});
        
        User.updateOne({_id:req.body.userId},{$push:{solvedQuizs:{id:req.body.quizId,topic:quiz.topic,subTopic:quiz.subTopic,answered:req.body.answered,totalNumberOfQuestions:quiz.numberOfQuestions,score:score,status:status}}})
        .then(() => {
            res.send({
                msg:"quiz added to user's solvedQuizsArray",
                topic:quiz.topic,
                subTopic:quiz.subTopic,
                answered:req.body.answered,
                totalNumberOfQuestions:quiz.numberOfQuestions,
                score:score,
                status:status
            })
        })
        .catch((err:Error) => {res.status(400).json(err)})
    })
    .catch((err:Error) => {
        console.log(err);
    })
    
    

}

const getUserDetailsById:RequestHandler = (req,res) =>
{
    // router.route("getuserId/:userId").get(passport.authenticate("jwt",{session:false}),(req,res)=>
    // {
    //     User.findOne({_id:req.params.userId})
    //     .then((user:user) => res.send({user:user}))
    //     .catch((err:Error) => {res.status(400).json("Error:"+err)});
    // })
    console.log(req.params.userId)
    User.findById({_id:req.params.userId})
        .then((user:user) => res.json(user))
        .catch((err:Error) => res.json(400).json("Error:"+err))

        // nothing
}


router.route("/add").post(addUser);
router.route("/login").post(loginUser);
router.route("/addQuiz").post(addQuizToUsersSolvedQuizs);
router.route("/getUserDetailsById/:userId").get(getUserDetailsById);



module.exports = router;
