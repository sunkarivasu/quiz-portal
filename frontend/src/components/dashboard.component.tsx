import axios from "axios";
import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";

interface quizResult {
    id:string
    topic:string,
    subTopic:string,
    score:number,
    totalNumberOfQuestions:number,
    answered:number
    status:string
}

const Dashboard = () => {

    var [quizs,setQuizs] = useState<quizResult[]>([]);
    var userId = useParams().userId;
    console.log(userId);
    
    useEffect(() => {
        console.log("useEffect");
        axios.get("/users/getUserDetailsById/"+userId)
        .then((res) => {
            
            console.log(res.data);
            console.log("sometinng");
            setQuizs(res.data.solvedQuizs.reverse());
        })
        .catch((err)=> {
            console.log("erro");
            console.log(err)
        })
        // setQuizs([
        //     {
        //         topic:"",
        //         subTopic:"",
        //         name:"",
        //         totalMarks:30,
        //         score:20,
        //         status:"Qualified"
        //     },
        //     {
        //         topic:"",
        //         subTopic:"",
        //         name:"",
        //         score:8,
        //         totalMarks:10,
        //         status:"Qualified"
        //     },
        //     {
        //         topic:"",
        //         subTopic:"",
        //         name:"",
        //         totalMarks:30,
        //         score:20,
        //         status:"Qualified"
        //     }
        // ])
        // setQuizs(quizs.reverse());
        
        // setQuizs(quizs.reverse);
        
    },[]);

    return <div className="dashboard-page">
        <div className=" flex-wrap">
            {quizs && quizs.map((quiz) => {
            return <div key={quiz.id+quiz.answered+quiz.totalNumberOfQuestions+""+quiz.status} className="result-card">
            <div>
                <div className="results-card-div">
                    <div className="score-card">
                        <h1 >{quiz.score}/{quiz.totalNumberOfQuestions}</h1>
                    </div>
                    <div className="results-card-item unAnsweredQuestions">
                        <p>Topic</p>
                        <p>{quiz.topic}</p>
                    </div>
                    <div className="results-card-item answeredQuestions">
                        <p>Sub Topic</p>
                        <p>{quiz.subTopic}</p>
                    </div>
                    {/* <div className="results-card-item name">
                        <p>Name</p>
                        <p>{quiz.name}</p>
                    </div> */}
                    <div className="results-card-item score">
                        <p>Score</p>
                        <p>{quiz.score}</p>
                    </div>
                    <div className="results-card-item status">
                        <p>Status</p>
                        <p>{quiz.status}</p>
                    </div>
                </div>
            </div>
        </div>
        })}   
    </div>
          
    </div> 
}

export default Dashboard;