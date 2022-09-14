import axios from "axios";
import React,{useState} from "react";

const CreateAQuiz = () => {

    var topicsAndSubTopics:{Aptitude:string[],English:string[],Reasoning:string[]} = {
        "Aptitude":["Distance & Speed","Ratios","Ages","Mixutres","Profit & Loss"],
        "English":["Reading Comprehension","Sentence Rearrangement","Error Detection"],
        "Reasoning":["Calendars","Blood Relations","Coding-Decoding"]
    }

    type questionType = {
        question:string,
        option1:string,
        option2:string,
        option3:string,
        option4:string,
        correctAnswer:number
    }

    var [topic,setTopic] = useState<string>("Aptitude");
    var [subTopicsList,setSubTopicsList] = useState(topicsAndSubTopics.Aptitude);
    var [subTopic,setSubTopic] = useState<string>("Distance & Speed");
    var [quizName,setQuizName] = useState<string>();
    var [numberOfQuestions,setNumberOfQuestions] = useState<number>(0);
    var [qualifyPercentage,setQualifyPercentage] = useState<number>();
    // var [isAddQuestionsButtonClicked,setIsAddQuestionsButtonClicked] = useState<boolean>(false);
    var [disableTopFeilds,setDisableTopFeilds] = useState(false);
    var [numberArray,setNumberArray] = useState<number[]>([]);
    var [topicErr,setTopicErr] = useState("")
    var [subTopicErr,setSubTopicErr] = useState("")
    var [nameerr,setNameErr] = useState("")
    var [numberOfQuestionsErr,setNumberOfQuestionsErr] = useState("")
    var [qualifyPercentageErr,setQualifyPercentageErr] = useState("")
    var [numberOfQuestionsErr,setNumberOfQuestionsErr] = useState("")

    var [quizDetials,setQuizDetails] = useState<{
        topic:string,
        subTopic:string,
        name:string,
        numberOfQuestions:number,
        qualifyPercentage:number,
        questions:questionType[],
        topicErr:string,
        subTopicErr:string,
        nameErr:string,
        numberOfQuestionsErr:string,
        qualifyPercentageErr:string,
        questionsErr:string,
    }>({
        topic:"Aptitude",
        subTopic:"",
        name:"",
        numberOfQuestions:0,
        qualifyPercentage:0,
        questions:[],
        topicErr:"",
        subTopicErr:"",
        nameErr:"",
        numberOfQuestionsErr:"",
        qualifyPercentageErr:"",
        questionsErr:"",

    })

    const validateInput = () => {

        console.log("validating input");
        console.log(quizDetials.name === "");
        
        
        var stringRegex = RegExp(/^[a-zA-Z]{4,}$/);
        var quizRegex = RegExp(/^[0-9a-zA-Z\s]{1,}$/gm);
        var numberOfQuestionsRegex = RegExp(/^[0-9]{1,}$/);
        var topicerr = ""
        var subTopicerr = ""
        var nameErr = ""
        var numberOfQuestionserr = ""
        var qualifyPercentageerr = ""
        
        
        //topic
        if(quizDetials.topic === "")
            topicerr = "Select Topic Name";
        // else if (quizDetials.topic.length<4)
        //     topicErr = "Topic Name should contain atleast 3 characters";
        // else if (!stringRegex.test(quizDetials.topic))
        //     topicErr = "Topic Name Should only contain characters";
        // else
        //     topicErr = ""

        //subTopic
        if(quizDetials.subTopic === "")
            subTopicerr = "Select SubTopic Name";
        // else if (quizDetials.subTopic.length<4)
        //     subTopicErr = "SubTopic Name should contain atleast 3 characters";
        // else if (!stringRegex.test(quizDetials.subTopic))
        //     subTopicErr = "SubTopic Name Should only contain characters";
        // else
        //     subTopicErr = "";

        //name
        if(quizDetials.name === "")
            nameErr = "Enter Quiz Name (Eg:Quiz 1)";
        else if (quizDetials.name.length<4)
            nameErr = "Quiz Name should contain atleast 3 characters";
        else if (!quizRegex.test(quizDetials.name))
            nameErr = "Quiz Name Should only contain characters and numbers";
        else
            nameErr = "";

        //number of Questions
        if(quizDetials.numberOfQuestions === 0)
            numberOfQuestionserr = "Enter number of Questions"
        else if(!numberOfQuestionsRegex.test(""+quizDetials.numberOfQuestions))
            numberOfQuestionserr = "Number of Questions should be an number"
        else
            numberOfQuestionserr =""
            
        //qualifyPercentage
        if(quizDetials.qualifyPercentage === 0)
            qualifyPercentageerr = "Enter Qualify Percentage";
        else if(!numberOfQuestionsRegex.test(""+quizDetials.qualifyPercentage))
            qualifyPercentageerr="Qualify Percentage sholud contain only numbers";
        else if (quizDetials.qualifyPercentage>100)
            qualifyPercentageerr="Qualify Percentage should be less than or equal to 100";

        setTopicErr(topicErr);
        setSubTopicErr(subTopicerr)
        setNameErr(nameErr);
        setNumberOfQuestionsErr(numberOfQuestionserr)
        setQualifyPercentageErr(qualifyPercentageerr)
        
    //     console.log({...quizDetials,
    //         nameErr:nameerr,
    //     topicErr:topicErr,
    //     subTopicErr:subTopicErr,
    //     numberOfQuestionsErr:numberOfQuestionsErr,
    //     qualifyPercentageErr:qualifyPercentageErr
    //     });
        

    //     setQuizDetails({...quizDetials,
    //     nameErr:nameerr,
    //     topicErr:topicErr,
    //     subTopicErr:subTopicErr,
    //     numberOfQuestionsErr:numberOfQuestionsErr,
    //     qualifyPercentageErr:qualifyPercentageErr   
    // })
        
        console.log(quizDetials);
    

        if(nameErr === "" && topicerr === "" && subTopicerr === "" && numberOfQuestionserr === "" && qualifyPercentageerr === "")
        {
            setDisableTopFeilds(true); 
            return true;
        }
        // console.log(quizDetials);
        return false;
    }

    const validateQuestions = () => {
        var flag =true;
        for(var i=0;i<quizDetials.questions.length;i++)
        {
            if(quizDetials.questions[i].question === "")
            {
                document.getElementsByClassName("questionErr"+i)[0].textContent = "Enter Question";
                flag =false;
            }
            else
            {
                document.getElementsByClassName("questionErr"+i)[0].textContent = "";
            }
            if(quizDetials.questions[i].option1 === "")
            {
                document.getElementsByClassName("optionErr"+i+" 1")[0].textContent = "Enter Option1";
                flag =false;
            }
            else
            {
                document.getElementsByClassName("optionErr"+i+" 1")[0].textContent = "";
            }
            if(quizDetials.questions[i].option2 === "")
            {
                document.getElementsByClassName("optionErr"+i+" 2")[0].textContent = "Enter option2";
                flag = false;
            }
            else
            {
                document.getElementsByClassName("optionErr"+i+" 2")[0].textContent = "";
            }
            if(quizDetials.questions[i].option3 === "")
            {
                document.getElementsByClassName("optionErr"+i+" 3")[0].textContent = "Enter Option3";
                flag = false;
            }
            else
            {
                document.getElementsByClassName("optionErr"+i+" 3")[0].textContent = "";
            }

            if(quizDetials.questions[i].option4 === "")
            {
                document.getElementsByClassName("optionErr"+i+" 4")[0].textContent = "Enter Option4";
                flag = false;
            }
            else
            {
                document.getElementsByClassName("optionErr"+i+" 4")[0].textContent = "";
            }
        }

        return flag;

    }

   

    const handleChangeInput = (name:string,value:string|number) => {
        console.log("name"+name);
        console.log("value"+value);
        
        
        setQuizDetails({
            ...quizDetials,
            [name]:value
        });

    }

    const resetForm = () => {
        setQuizDetails({
            topic:"Aptitude",
            subTopic:"",
            name:"",
            numberOfQuestions:0,
            qualifyPercentage:0,
            questions:[],
            topicErr:"",
            subTopicErr:"",
            nameErr:"",
            numberOfQuestionsErr:"",
            qualifyPercentageErr:"",
            questionsErr:"",
        });
        setDisableTopFeilds(false);
    }

    const handleChangeQuestionInput = (name:number,id:number,value:string|number) => {
        if(name === 0)
        {
            var sampleQuestions = quizDetials.questions as questionType[];
            sampleQuestions[id] = {
                ...sampleQuestions[id],
                question:value+""
            }
            setQuizDetails({...quizDetials,
            questions:sampleQuestions})
        }
        else if(name === 1)
        {
            var sampleQuestions = quizDetials.questions as questionType[];
            sampleQuestions[id] = {
                ...sampleQuestions[id],
                option1:value+""
            }
            setQuizDetails({...quizDetials,
            questions:[...quizDetials.questions]})
        }
        else if(name === 2)
        {
            var sampleQuestions = quizDetials.questions as questionType[];
            sampleQuestions[id] = {
                ...sampleQuestions[id],
                option2:value+""
            }
            setQuizDetails({...quizDetials,
            questions:[...quizDetials.questions]})
        }
        else if(name === 3)
        {
            var sampleQuestions = quizDetials.questions as questionType[];
            sampleQuestions[id] = {
                ...sampleQuestions[id],
                option3:value+""
            }
            setQuizDetails({...quizDetials,
            questions:[...quizDetials.questions]})
        }
        else if(name === 1)
        {
            var sampleQuestions = quizDetials.questions as questionType[];
            sampleQuestions[id] = {
                ...sampleQuestions[id],
                option1:value+""
            }
            setQuizDetails({...quizDetials,
            questions:[...quizDetials.questions]})
        }
        else if(name === 4)
        {
            var sampleQuestions = quizDetials.questions as questionType[];
            sampleQuestions[id] = {
                ...sampleQuestions[id],
                option4:value+""
            }
            setQuizDetails({...quizDetials,
            questions:[...quizDetials.questions]})
        }
        else
        {
            var sampleQuestions = quizDetials.questions as questionType[];
            sampleQuestions[id] = {
                ...sampleQuestions[id],
                correctAnswer:+value
            }
            setQuizDetails({...quizDetials,
            questions:[...quizDetials.questions]})
        }
    }
 
    const handleChangeTopic = (topicName:string) => {
        console.log(topicName);
        setTopic(topicName);
        if(topicName === "Aptitude")
            setSubTopicsList(topicsAndSubTopics.Aptitude);
        else if(topicName === "English")
            setSubTopicsList(topicsAndSubTopics.English);
        else if(topicName === "Reasoning")
            setSubTopicsList(topicsAndSubTopics.Reasoning)
        return null;
    }

    const handleChangeSubTopic = (subTopicName:string) => {
        setSubTopic(subTopicName);
    }

    const uploadQuiz = () => {
        if(validateQuestions() )
        {
            console.log(quizDetials);
            
        }
        axios.post("/quizs/add",{
            ...quizDetials
        })
        .then((res) => {
            resetForm();
            console.log(res.data);
        })
        .catch((err) => console.log(err))
    }

    return <div className="create-a-quiz">
        <form className="create-a-quiz-form">
            <div className="form-field">
                <label htmlFor="topic">Topic</label>
                <select className="form-control" name="topic" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChangeTopic(e.target.value);
                    handleChangeInput(e.target.name,e.target.value);
                }} id="topic" value={quizDetials.topic} disabled={disableTopFeilds}>
                    {["Aptitude","English","Reasoning"].map((t)=>{
                        return <option key={t} value={t}>{t}</option>
                    })}
                </select>
                <p className="error">{topicErr}</p>
            </div>
            <div className="form-field">
                <label htmlFor="subTopic">Sub Topic</label>
                <select className="form-control" name="subTopic" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {handleChangeSubTopic(e.target.value);
                    handleChangeInput(e.target.name,e.target.value);
                }} id="subTopic" disabled={disableTopFeilds}>
                    {subTopicsList && subTopicsList.map((st:string) => {
                        return <option key={st} value={st}>{st}</option>
                    })}
                </select>
                <p className="error">{subTopicErr}</p>
            </div>
            <div className="form-field">
                <label htmlFor="quizName">Quiz Name</label>
                <input type="text" name="name" value={quizDetials.name} className="form-control" id="quizName" placeholder="Quiz 1"  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeInput("name",e.target.value);
                }} disabled={disableTopFeilds}/>
                <p className="error">{nameerr}</p>
            </div>
            <div className="form-field">
                <label htmlFor="numberOfQuestions">Number of Questions</label>
                <input type="text" className="form-control" id="numberOfQuestions" onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setNumberOfQuestions(+e.target.value);
                    handleChangeInput("numberOfQuestions",+e.target.value);
                }} disabled={disableTopFeilds}/>
                <p className="error">{numberOfQuestionsErr}</p>
            </div>
            <div className="form-field">
                <label htmlFor="qualifyPercentage">Qualify Percentage</label>
                <input type="text" className="form-control" id="qualifyPercentage" onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeInput("qualifyPercentage",+e.target.value);
                }} disabled={disableTopFeilds}/>
                <p className="error">{qualifyPercentageErr}</p>
            </div>
            {disableTopFeilds? numberArray.length>0 &&
            <div>
                {quizDetials.questions.length>0 && numberArray.map((num) => {
                    console.log(quizDetials);
                    
                    return <div className="question-section">
                        <div className="">
                            <label htmlFor={"question"+num}>Question {num}</label>
                            <textarea name="question" id={"question"+(num-1)} className="form-control" cols={30} rows={3} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {
                                handleChangeQuestionInput(0,num-1,e.target.value);
                            }} value={quizDetials.questions[num-1].question}>
                            </textarea>
                            <p className={"error questionErr"+(num-1)}></p>
                        </div>
                        <div className="create-a-quiz-options">
                                <input type="text" className="create-a-quiz-option form-control" placeholder="option1" value={quizDetials.questions[num-1].option1} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeQuestionInput(1,num-1,e.target.value);
                                }}/>
                                <p className={"error optionErr"+(num-1)+" 1"}></p>
                                <input type="text" className="create-a-quiz-option form-control" placeholder="option2" value={quizDetials.questions[num-1].option2} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeQuestionInput(2,num-1,e.target.value);
                                }}/>
                                <p className={"error optionErr"+(num-1)+" 2"}></p>
                                <input type="text" className="create-a-quiz-option form-control" placeholder="option3" value={quizDetials.questions[num-1].option3} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeQuestionInput(3,num-1,e.target.value);
                                }}/>
                                <p className={"error optionErr"+(num-1)+" 3"}></p>
                                <input type="text" className="create-a-quiz-option form-control" placeholder="option4" value={quizDetials.questions[num-1].option4} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeQuestionInput(4,num-1,e.target.value);
                                }}/>
                                <p className={"error optionErr"+(num-1)+" 4"}></p>
                        </div>
                        <div>
                            <label htmlFor="topic">Correct Option</label>
                            <select className="form-control" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeQuestionInput(5,num-1,e.target.value)} id="topic" value={quizDetials.questions[num-1].correctAnswer}>
                                {[1,2,3,4].map((t)=>{
                                    return <option key={t} value={t}>{t}</option>
                                })}
                            </select>
                            <p className=""></p>
                        </div>
                    </div>})}
                    <div>
                        <button className="btn btn-dark" onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            uploadQuiz();
                        }}>Upload</button>
                    </div>
            </div>
            :<div className="">
            <button className="btn btn-dark" onClick={(e:React.MouseEvent) => {
                console.log("clicked",numberOfQuestions);
                e.preventDefault();
                console.log("validation output");
                console.log(validateInput());
                
                if(validateInput())
                    setDisableTopFeilds(true);
                else
                    setDisableTopFeilds(false);
                var list = [];
                var initialQuestions:questionType[] = []
                for(var i=1;i<=quizDetials.numberOfQuestions;i++)
                {
                    list.push(i);
                    initialQuestions.push({
                        question:"",
                        option1:"",
                        option2:"",
                        option3:"",
                        option4:"",
                        correctAnswer:1
                    });
                }
                setNumberArray(list);
                console.log({...quizDetials,questions:initialQuestions});
                
                setQuizDetails({...quizDetials,questions:initialQuestions});
                console.log(quizDetials);
            }}>Add Questions</button>
        </div>}
        </form>
    </div>
}

export default CreateAQuiz;