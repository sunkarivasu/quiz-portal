import React,{useState,useEffect,useContext} from "react";
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import { useContainer } from "class-validator";
import { UserContext } from "../App";

type quizNametype = "Aptitude"|"English"|"Reasoning";

interface subTopic
{
    id:string,
    name:string
}


interface question
{
    id:string,
    question:string,
    option1:string,
    option2:string,
    option3:string,
    option4:string,
    answer:number,
    qualifyPercentage:number
}

interface Quiz{
    _id:string;
    name:string;
}


const QuizsPage:React.FC = () => {

    
    var nav = useNavigate();
    var topicName = useParams().quizname!;

    var usercontext = useContext(UserContext);


    var [topic,setQuizName] = useState<string>(topicName);
    var [subTopics,setSubTopics] = useState<string[]>([]);
    var [subTopic,setSubTopic] = useState<string|null>(null);
    var [allQuizList,setAllQuizList] = useState<{_id:string,name:string}[]|null>(null);

    var quizList:quizNametype[];
    quizList = ["Aptitude","English","Reasoning"]

    var topicsAndSubTopics:{Aptitude:string[],English:string[],Reasoning:string[]} = {
        "Aptitude":["Distance & Speed","Ratios","Ages","Mixutres","Profit & Loss"],
        "English":["Reading Comprehension","Sentence Rearrangement","Error Detection"],
        "Reasoning":["Calendars","Blood Relations","Coding-Decoding"]
    }


    useEffect(() => {
        getSubTopics(topic);
    },[])


    const clearColorForAllButtons = () =>
    {
        for(var q of ["Aptitude","English","Reasoning"])
        {
            document.getElementById(q)!.classList.remove("btn-dark");
        }
    }

    const checkUser = () => {
        if(usercontext?.user === null)
        {
            nav("/login");
            return false
        }
        return true;

    }

    const handleChangeQuizType = (name:quizNametype) => {
            setQuizName(name);
            setSubTopic(null);
            clearColorForAllButtons();
            document.getElementById(name)!.classList.add("btn-dark");
            getSubTopics(name);
            return "";
        }

    

    const getSubTopics = (topicName:string) => {
        console.log("getting subTopics for"+topicName);
        increaseSubTopicsButtonSize();

        if(topicName === "Aptitude")
            setSubTopics(topicsAndSubTopics.Aptitude);
        else if(topicName === "Reasoning")
            setSubTopics(topicsAndSubTopics.Reasoning);
        else if(topicName === "English")
            setSubTopics(topicsAndSubTopics.English);
    }

    const getAllQuizsOfSubTopic = (subTopicName:string) => {
        console.log(topic,subTopicName);
        
        axios.get("http://localhost:8000/quizs/fetchAllQuizsByTopicAndSubTopic/"+topic+"/"+subTopicName).then((res) =>
        {
            console.log(res.data);
            setAllQuizList(res.data.quizs);
            
        }).catch((err) => console.log(err));
    }
 
    const reduceSubTopicsButtonSize = () => {
        var subTopicHTMLElementsList;
        subTopicHTMLElementsList = document.getElementsByClassName("sub-btn")!;
        console.log(subTopicHTMLElementsList);
        for(var i=0;i<subTopicHTMLElementsList.length;i++)
        {
            subTopicHTMLElementsList[i].classList.remove("subTopic-btn");
            subTopicHTMLElementsList[i].classList.remove("btn-dark");
        } 
    }

    const increaseSubTopicsButtonSize = () => {
        var subTopicHTMLElementsList;
        subTopicHTMLElementsList = document.getElementsByClassName("sub-btn")!;
        console.log(subTopicHTMLElementsList);
        for(var i=0;i<subTopicHTMLElementsList.length;i++)
        {
            subTopicHTMLElementsList[i].classList.add("subTopic-btn");
            subTopicHTMLElementsList[i].classList.remove("btn-dark");
        }      
    }


    
    return <div className="quizs-page">
        <div className="quizname-btn-headers">
            {quizList.map((quizname) =>
            {
                if(quizname === topic)
                    return <button key={quizname} id={quizname} className="btn btn-dark" onClick={() => handleChangeQuizType(quizname)}>{quizname}</button>
                else
                    return <button key={quizname} id={quizname} className="btn " onClick={() => handleChangeQuizType(quizname)}>{quizname}</button>
            })}
        </div>
        <div className="allAvailableQuizs">
            {subTopics.map((subtopic) => {
                return <button key={subtopic} id={subtopic} className="btn black-border sub-btn subTopic-btn" onClick={()=>{
                    reduceSubTopicsButtonSize();
                    document.getElementById(subtopic)?.classList.add("btn-dark");
                    setSubTopic(subtopic);
                    getAllQuizsOfSubTopic(subtopic);
                }}> 
                    {subtopic}
                </button>
            })}
        </div>
        <div className="quizList">
            {allQuizList?.length === 0 ?<div><p>No Quizs Available</p></div>:subTopic && allQuizList && 
            <div>
                {allQuizList.map((quiz)=> {
                    return <button key={quiz._id} id={quiz._id} className="quiz-btn btn black-border" onClick={() => {
                        if(checkUser())
                            nav("/quiz/"+quiz._id);
                    }}>{quiz.name}</button>
                })}
            </div>}
        </div>         
    </div>
}

export default QuizsPage;


