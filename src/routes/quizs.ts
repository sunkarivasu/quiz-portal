import axios from "axios";
import { RequestHandler } from "express";
var Quiz = require("../models/quiz.model");

export interface quiz
{
    id:string,
    topic:string,
    subTopic:string,
    name:string,
    numberOfQuestions:number,
    qualifyPercentage:number,
    questions:{
        id:string,
        question:string,
        option1:string,
        option2:string,
        option3:string,
        option4:string,
        correctAnswer:number,
    }[]
}




const router = require('express').Router();

const fecthAllQuizs:RequestHandler = (req,res,next) => {
    console.log("fetching all quizs");
    Quiz.find({})
    .then((quizs:quiz[]) => res.send({"quizs":quizs}))
    .catch((err:Error) => console.log(err));
}

const fetchAllQuizsByTopicAndSubTopic:RequestHandler = (req,res,next) => {
    console.log("topic"+req.params.topic);
    console.log("topic"+req.params.subTopic);
    
    Quiz.find({topic:req.params.topic,subTopic:req.params.subTopic},{name:1})
    .then((quizs:quiz[]) => {
        res.send({quizs:quizs})
    })
    .catch((err:Error) => console.log(err));
}

const addQuiz:RequestHandler = (req,res,next) => {
    var newQuiz = new Quiz({
        topic:req.body.topic,
        subTopic:req.body.subTopic,
        name:req.body.name,
        numberOfQuestions:+req.body.numberOfQuestions,
        qualifyPercentage:+req.body.qualifyPercentage,
        questions:req.body.questions        
    });
    newQuiz.save()
        .then(() => {
            res.send({msg:"quiz added successfully"})
        })
        .catch((err:Error) => {
            console.log(err);
        })
}

const getQuizDetialsById:RequestHandler = (req,res,next) => {
    Quiz.findById(req.params.id).then((response:quiz) => {
        res.send({quiz:response})

    })
}



router.route("/").get(fecthAllQuizs);
router.route("/fetchAllQuizsByTopicAndSubTopic/:topic/:subTopic").get(fetchAllQuizsByTopicAndSubTopic);
router.route("/add").post(addQuiz);
router.route("/getQuizDetialsById/:id").get(getQuizDetialsById);


module.exports = router;