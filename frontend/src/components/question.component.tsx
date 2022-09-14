import React, { useState ,useEffect,useContext} from "react";
import "../App.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { useGlobalState } from "../stateManagement";
import { UserContext } from "../App";

interface question{
    id:number,
    _id:string,
    question:string,
    answer:number,
    option1:string,
    option2:string,
    option3:string,
    option4:string
}


interface quiz{
    name:string, 
    numberOfQuestions:number
    qualifyPercentage:number
    questions: []
    subTopic: string,
    topic:string
    __v:number,
    _id: string
}




const Questions:React.FC = () => {

    var nav = useNavigate();

    var quizId = useParams().quizid;

    // var [user,setUser] = useGlobalState("user");

    var [questions,setQuestions] = useState<question[]>([]);
    var [selectedAnswers,setSelectedAnswers] = useState<number[]>([]);
    var [currentQuestion,setCurrentQuestion] = useState<number>(1);
    var [dataFetched,setDataFetched] = useState(false);

    var usercontext = useContext(UserContext);
    var [user,setUser] = useState(usercontext?.user)



    useEffect(() => {
        console.log(quizId);
        if(dataFetched === false)
            fetchData();
        else
        {
            clearColorForAllOptions();
            setInitialOption();
        }
       
    },[currentQuestion]);

    

    const fetchData = () => {
        axios.get("/quizs/getQuizDetialsById/"+quizId)
        .then((res) => {
            setQuestions(res.data.quiz.questions);
            var zerosList = [];
            for(var i=0;i<res.data.quiz.numberOfQuestions;i++)
            {
                zerosList.push(0)
            }
            setSelectedAnswers(zerosList);
            console.log(res.data.quiz); 
            console.log(questions);
            setDataFetched(true);
        })
        .then(() => {console.log(questions);
        })
        .catch((err:Error) => console.log(err));
        
    }

    const submitQuiz = () => {
        var answered = 0;
        for(var answer of selectedAnswers)
        {
            if(answer !== 0)
                answered += 1;
        }

        axios.post("/users/addQuiz",{
            userId:user?._id,
            quizId:quizId,
            answered:answered,
            answers:selectedAnswers
        }).then((res) => {
            console.log(res.data);
            var unanswered =  res.data.totalNumberOfQuestions - answered;
            var incorrect = res.data.totalNumberOfQuestions - res.data.score
            nav("/results/"+res.data.status+"/"+res.data.score+"/"+res.data.answered+"/"+res.data.totalNumberOfQuestions+"/"+unanswered+"/"+incorrect);
        })
        .catch((err) => console.log(err))
    }


    const handleOptionClick = (selectedOption:number) => {
        
        clearColorForAllOptions();
        document.getElementsByName("option"+selectedOption)[0].classList.add("btn-dark");
        if(selectedAnswers.length<currentQuestion)
        {
            selectedAnswers.push(selectedOption);
            setSelectedAnswers(selectedAnswers);
        }
        else
        {
            selectedAnswers[currentQuestion-1] = selectedOption;
        }
        console.log(selectedAnswers);
        return "";
    }

    const setInitialOption = () => {
        console.log(currentQuestion);
        console.log(selectedAnswers[currentQuestion-1]);
        
        if(selectedAnswers[currentQuestion-1]!=0)
        {
            var btn:HTMLButtonElement = document.getElementsByName("option"+(selectedAnswers[currentQuestion-1]))[0]! as HTMLButtonElement;
            btn.classList.add("btn-dark");
        }
    }

    const clearColorForAllOptions= () => 
    {
        for(var i=1;i<=4;i++)
        {
            document.getElementsByName("option"+i)[0].classList.remove("btn-dark");
        }
    }
 
    return <div className="question-page">
        {questions.length>0 ?<div>
            <div className="questionAndAnswer">
                <div className="question">
                    <h5>{currentQuestion}. {questions[currentQuestion-1].question}</h5>
                </div>
                <hr />
                <div className="answers">   
                    <button name="option1" className=" option  btn" onClick={() => handleOptionClick(1)}>1.{questions[currentQuestion-1].option1}</button>
                    <button name="option2" className=" option  btn" onClick={() => handleOptionClick(2)}>2.{questions[currentQuestion-1].option2}</button>
                    <button name="option3" className=" option btn" onClick={() => handleOptionClick(3)}>3.{questions[currentQuestion-1].option3}</button>
                    <button name="option4" className="option btn" onClick={() => handleOptionClick(4)}>4.{questions[currentQuestion-1].option4}</button>
                    <button className="btn option clear-response-btn" onClick={() => {clearColorForAllOptions();
                    if(currentQuestion>=selectedAnswers.length)
                    {
                        selectedAnswers[currentQuestion-1] = 0;
                        console.log(selectedAnswers);
                        
                    }}}>Clear Response</button>
                </div>
            </div>
            <div className="question-bottom-section">
                <button className="btn previous-btn question-bottom-btn btn-dark"onClick={(event) => {
                    if(currentQuestion>1)
                    {
                        setCurrentQuestion(currentQuestion-1);
                    }
                }} disabled={currentQuestion === 1}>Previous</button>
                {currentQuestion<questions.length?<button className="btn  question-bottom-btn btn-dark" onClick={() => {
                    clearColorForAllOptions();
                    if(currentQuestion<questions.length)
                    {
                        setCurrentQuestion(currentQuestion+1);
                        // clearColorForAllOptions();
                        // setInitialOption();
                        // console.log(currentQuestion); 
                    }
                }} >Next</button>:<button className="btn  question-bottom-btn btn-dark" onClick={() => {
                    // var noOfUnAnsweredQuestions = 0;
                    // var score = 0;
                    // for(var i=0;i<selectedAnswers.length;i++)
                    // {
                    //     if(selectedAnswers[i] === 0)
                    //         noOfUnAnsweredQuestions += 1
                    //     else
                    //     {
                    //         if(selectedAnswers[i] === questions[i].answer)
                    //             score += 1;
                    //     }
                    // }
                    submitQuiz();
                }} >Submit</button>}
            </div>
        </div>:<div><p>loading...</p></div>}
    </div>
}

export default Questions