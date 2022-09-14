import React, { useEffect ,createContext, useState, useContext} from "react";
import "../App.css";
import Footer from "./Footer";
import Registration from "./login.component";
import { } from 'react-icons'
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../stateManagement";
import { UserContext } from "../App";
// interface UserContextInterface 
// {
//     _id: string,
//     emailId: string,
//     isAdmin: string 
//     name: string ,
//     password: string
//     rank:number,
//     solvedQuizs:{id: string, score: number, answered: number, _id: string}[]
//     __v:number
// }

// export const UserCtx = createContext<UserContextInterface | null>(null);

const Home:React.FC = () => {
    const nav = useNavigate();
    
    // var user = useContext(UserContext)
    
    // var [user,setUser] = useGlobalState('user');

    return <div className="home-page">
        {/* <UserCtx.Provider value={user}> */}
            <div className="carousel-section">
                <img src="" alt=""/>
            </div>
            <div className="description-section">
                <p>
                Don’t know how to code and want to make your own quiz? You’ll need an online tool to do so. With this Online quiz Portal you can create something that is beautiful, mobile-friendly, and effortless.
                </p>
            </div>
            <div className="quizs-section">
                <button className="quizname-btn btn" onClick={() =>
                    nav("/quizs/Aptitude")
                }>
                    <div>
                        Appitude
                    </div>
                </button>
                <button className="quizname-btn btn" onClick={() =>
                    nav("/quizs/English")
                }>
                    <div>
                        English
                    </div>
                </button>
                <button className="quizname-btn btn" onClick={() =>
                    nav("/quizs/Reasoning")
                }>
                    <div>
                        Reasoning
                    </div>
                </button>
            </div>
        {/* </UserCtx.Provider> */}
    </div>
}

export default Home;