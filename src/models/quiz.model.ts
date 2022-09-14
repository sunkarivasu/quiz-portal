// class Quiz{  
//     constructor(public id:string,topic:string,subTopic:string,name:string,numberOfQuestions:number,qualifyPercentage:number){}
// }

var mongoose_ = require("mongoose");

var quizSchema = new mongoose_.Schema(
    {
        id:String,
        topic:String,
        subTopic:String,
        name:String,
        numberOfQuestions:Number,
        qualifyPercentage:Number,
        questions:[{
            question:String,
            option1:String,
            option2:String,
            option3:String,
            option4:String,
            correctAnswer:Number,
    }]
});

var Quiz = mongoose_.model("quiz",quizSchema);


module.exports = Quiz;