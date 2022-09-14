import React ,{useEffect,useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../stateManagement";
import { UserContext } from "../App";
import { useContainer } from "class-validator";
import {userType} from "../types/userType";

const Header:React.FC = () => {

    var intialUser:userType = {
        _id:"",
        name:"",
        password:"",
        emailId:"",
        phoneNumber:"",
        rank:0,
        isAdmin:false,
        __v:0,
        solvedQuizs:[]
    }


    var nav = useNavigate();
    var [user,setUser] = useState<userType|null>();
    var usercontext = useContext(UserContext);


    useEffect(() => {
        console.log(usercontext?.user);
        
        setUser(usercontext?.user);
        // if(user)
        // {
        //     setUserDetials(JSON.parse(user) as usertype);
        //     var presentUser = JSON.parse(user)
        //     console.log(presentUser.name);
        // }
    });
    // usercontext?.toggleUser({
    //     _id:"",
    //     name:"vasu",
    //     password:"",
    //     emailId:"",
    //     phoneNumber:"",
    //     rank:0,
    //     isAdmin:false,
    //     __v:0,
    //     solvedQuizs:[]
    // })
    // console.log(usercontext?.user.name)
    
    // var [userDetials,setUserDetials] = useState<usertype|null>(null);
    // var user = null;
    // user = localStorage.getItem("user");
    // if(user)
    // {
    //     // setUserDetials(JSON.parse(user) as usertype);
    //     var presentUser = JSON.parse(user)
    //     console.log(presentUser.name);
    // }

    

    

    return <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
    <a className="navbar-brand" href="#">QuizPortal</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {user?
        // user._id!==""?
            <ul className="navbar-nav ms-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="" onClick={() => {nav("/");
                    console.log("home");
                    
                }}>Home </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => {nav("/quizs/Apptitude");
                }}>Quizs</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => {nav("/dashboard/"+usercontext?.user?._id)  //user._id)
                }}>Dashboard</a>
                </li>
                <li className="nav-item username">
                    <p>Hi {user.name} !</p>
                </li>
                <li className="nav-item">
                    {/* <a className="nav-link" href="#"> */}
                        <button className="btn btn-dark createQuiz-btn" onClick={() => {
                            nav("/createAQuiz")
                        }}>
                            Create a quiz
                        </button>
                    {/* </a> */}
                </li>
                <li className="nav-item logout-btn">
                    <button className="btn btn-secondary" onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        // setUser(intialUser);
                        usercontext?.toggleUser(null);
                        nav("/");
                    }}> logout</button>
                </li>
            </ul>
        :
        <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
                <a className="nav-link" href="" onClick={() => {nav("/");
                console.log("home");
                
            }}>Home </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => {nav("/quizs/Apptitude");
            }}>Quizs</a>
            </li>
            <li className="nav-item loginAndCreateAQuizSection">
                <a className="nav-link" href="#">
                    <button className="btn btn-dark" onClick={() => {nav("/login")}}>
                        Login
                    </button>
                </a>
            </li>
            
        </ul>}
    </div>
</nav>
}

export default Header;