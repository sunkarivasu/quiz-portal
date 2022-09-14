import React from 'react';
import Registration from './components/login.component';
import Home from './components/home.component';
import Questions from './components/question.component';
import ResultsPage from './components/results.component';
import { BrowserRouter as Router ,Route,Routes} from "react-router-dom";
import Footer from './components/Footer';
import QuizsPage from './components/quizsPage.component';
import Header from './components/header.component';
import CreateAQuiz from './components/createAQuiz.component';
import Dashboard from './components/dashboard.component';
import {useState,useMemo} from "react";
import { userType } from './types/userType';


export var UserContext =React.createContext<{user:userType|null,toggleUser:(user:userType|null) => void}|null>(null);




function App() {
  var userDetials = localStorage.getItem("user");
  var userD = null;
  if(userDetials!=null)
    userD = JSON.parse(userDetials);
  
  var [user,setUser] = useState<userType|null>(userD)

  const init = {_id:"",
      name:"",
      emailId:"",
      password:"",
      phoneNumber:"",
      __v:0,
      solvedQuizs:[],
      rank:0,
      isAdmin:false
  }

  const print = () => {
    console.log(user);
  } 


  const toggleUser = (user:userType|null) => {
    console.log(user);
    
    console.log("changeing user");
    setUser(user);
    print();
  }

  return (
    <>
    <Router>
          <div className="main-container">
            <UserContext.Provider value={{user,toggleUser}}>
            <Header/>
            <div className='main-content'>
              <Routes>
                {/* routes */}
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Registration/>}/>
                <Route path="/quizs/:quizname" element={<QuizsPage />}/>
                <Route path="/quiz/:quizid" element={<Questions/>}/>
                <Route path="/results/:status/:score/:answered/:totalNumberOfQuestions/:unanswered/:incorrect" element={<ResultsPage/>}/>
                <Route path="/createAQuiz" element={<CreateAQuiz/>}/>
                <Route path="/dashboard/:userId" element={<Dashboard/>}/>
              </Routes>
            </div>
            <Footer/>
            </UserContext.Provider>
          </div>
        </Router>
     </>
    );
}

export default App;
