"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quiz = require("../models/quiz.model");
const router = require('express').Router();
const fecthAllQuizs = (req, res, next) => {
    console.log("fetching all quizs");
    Quiz.find({})
        .then((quizs) => res.send({ "quizs": quizs }))
        .catch((err) => console.log(err));
};
const fetchAllQuizsByTopicAndSubTopic = (req, res, next) => {
    console.log("topic" + req.params.topic);
    console.log("topic" + req.params.subTopic);
    Quiz.find({ topic: req.params.topic, subTopic: req.params.subTopic }, { name: 1 })
        .then((quizs) => {
        res.send({ quizs: quizs });
    })
        .catch((err) => console.log(err));
};
const addQuiz = (req, res, next) => {
    var newQuiz = new Quiz({
        topic: req.body.topic,
        subTopic: req.body.subTopic,
        name: req.body.name,
        numberOfQuestions: +req.body.numberOfQuestions,
        qualifyPercentage: +req.body.qualifyPercentage,
        questions: req.body.questions
    });
    newQuiz.save()
        .then(() => {
        res.send({ msg: "quiz added successfully" });
    })
        .catch((err) => {
        console.log(err);
    });
};
const getQuizDetialsById = (req, res, next) => {
    Quiz.findById(req.params.id).then((response) => {
        res.send({ quiz: response });
    });
};
router.route("/").get(fecthAllQuizs);
router.route("/fetchAllQuizsByTopicAndSubTopic/:topic/:subTopic").get(fetchAllQuizsByTopicAndSubTopic);
router.route("/add").post(addQuiz);
router.route("/getQuizDetialsById/:id").get(getQuizDetialsById);
module.exports = router;
