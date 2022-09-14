import React,{useEffect}from "react";
import "../App.css"
import { useNavigate ,useParams} from "react-router-dom";

const ResultsPage = () => {
    var nav = useNavigate();

    var status = useParams().status;
    var score = useParams().score;
    var totalNumberOfQuestions= useParams().totalNumberOfQuestions;
    var answered = useParams().answered;
    var unanswered = useParams().unanswered;
    var incorrect = useParams().incorrect;
    
        

    useEffect(() => {


    },[]);

    return <div className="results-page">
        <div className="results-div">
            <div className="score-card">
                <h1 >{score}/{totalNumberOfQuestions}</h1>
            </div>
            <div className="results-item unAnsweredQuestions">
                <p>UnAnswered</p>
                <p>{unanswered}</p>
            </div>
            <div className="results-item answeredQuestions">
                <p>Answered</p>
                <p>{answered}</p>
            </div>
            <div className="results-item correct">
                <p>Correct</p>
                <p>{score}</p>
            </div>
            <div className="results-item incorrect">
                <p>InCorrect</p>
                <p>{incorrect}</p>
            </div>
            {/* <div className="results-item score">
                <p>Score</p>
                <p>8</p>
            </div> */}
            <div className="results-item score">
                <p>Status</p>
                <p>{status}</p>
            </div>
            <button className="btn btn-dark backToHome" onClick={()=>{
                nav("/");
            }}>Back To Home</button>
        </div>
    </div>
}

export default ResultsPage;