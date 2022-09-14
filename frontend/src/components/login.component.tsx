import React, { ChangeEventHandler, useEffect, useState, useContext } from "react";
import {nativeSelectClasses, TextField} from '@mui/material';
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IsString,IsEmail,IsNotEmpty,MinLength,MaxLength,Matches,IsMobilePhone, Length, IsNumber} from "class-validator";
import {validate} from "class-validator";
import { useGlobalState } from "../stateManagement";
import { UserContext } from "../App";


class User{
  
  @IsNotEmpty()
  @IsString()
  name:string

  @IsNotEmpty()
  @IsEmail()
  emailId:string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password:string

  
  confirmPassword:string

  @IsNumber()
  phoneNumber:number


  constructor(name:string,emailId:string,password:string,confirmPassword:string,phoneNumber:number){
    this.name = name;
    this.emailId = emailId;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.phoneNumber = phoneNumber;
  }

}


const Registration:React.FC = (props) => {

  var [login,setLogin] = useState<boolean>(true);

  var [user,setUser ] = useGlobalState("user");

  var userContext = useContext(UserContext);

  var [loginStatusMsg,setLoginStatusMsg] = useState<string>("")
  
  var initialLoginDetials = {
    emailId:"",
    password:"",
    emailIdErr:"",
    passwordErr:""
  }
  var [loginDetials,setLoginDetials] = useState(initialLoginDetials)

  var [registrationStatusMsg,setRegistrationStatusMsg] = useState<string>("")

  var initialRegistrationDetials = {
      name:"",
      emailId:"",
      password:"",
      confirmPassword:"",
      phoneNumber:"",
      
  }

  var [registrationDetials,setRegistrationDetials] = useState(initialRegistrationDetials);

  var nav = useNavigate();

  useEffect(() =>{
    // document.getElementsByClassName("lemailerror")[0]!.textContent = "";
    // document.getElementsByClassName("lpassworderror")[0]!.textContent = "";
  },[login]);

  const handleChangeLoginInput = (name:string,value:string) => {
    console.log(name,value);
    
    setLoginDetials({...loginDetials,
    [name]:value});
    return "";
  }

  const handleChangeRegistrationInput = (name:string,value:string) => {
    console.log(name,value);
    
    setRegistrationDetials({...registrationDetials,
    [name]:value});
    return "";
  }

  const registerUser = () => {

    var nameError = document.getElementsByClassName("errorname")[0]! as HTMLParagraphElement;
    var emailError = document.getElementsByClassName("erroremailId")[0]! as HTMLParagraphElement;
    var passwordError = document.getElementsByClassName("errorpassword")[0]! as HTMLParagraphElement;
    var phoneNumberError = document.getElementsByClassName("errorphoneNumber")[0]! as HTMLParagraphElement;
    var confirmPasswordError = document.getElementsByClassName("errorconfirmPassword")[0]! as HTMLParagraphElement;

    var nameRegexp = new RegExp(/^[a-zA-z ]{6,}$/gm)
    var emailRegexp = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    var passwordRegexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/gm);
    var phoneNumberRegExp = new RegExp(/^[0-9]{10}$/gm)


    //name validation
    if(registrationDetials.name === "")
      nameError.textContent = "Enter Name";
    else if(registrationDetials.name.length<6)
      nameError.textContent = "Name should contain atleast 6 characters";
    else if(!nameRegexp.test(registrationDetials.name))
      nameError.textContent = "Name Should only contain characters";
    else
      nameError.textContent = "";

    // email validation
    if(registrationDetials.emailId === "")
      emailError.textContent = "Enter Email";
    else if(!emailRegexp.test(registrationDetials.emailId))
      emailError.textContent = "Invalid email"
    else
      emailError.textContent = ""

    //pasword validation
    if(registrationDetials.password === "")
      passwordError.textContent = "Enter Password";
    else if(registrationDetials.password.length<6)
      passwordError.textContent = "Password shouild contain atleast 6 characters";
    else if(!passwordRegexp.test(registrationDetials.password))
      passwordError.textContent = "Weak password";
    else
      passwordError.textContent = "";
    
    //confirm password
    if(registrationDetials.password !== registrationDetials.confirmPassword)
      confirmPasswordError.textContent = "Passwords did not match";
    else
      confirmPasswordError.textContent = "";

    //mobile number
    console.log(registrationDetials.phoneNumber.length,10);
    
    if(registrationDetials.phoneNumber.length !== 10)
      phoneNumberError.textContent = "Mobile number should contain exactly 10 digits";
    else if(!phoneNumberRegExp.test(registrationDetials.phoneNumber))
      phoneNumberError.textContent = "Invalid Mobile number"; 
    else
      phoneNumberError.textContent = "";

    if(nameError.textContent === "" && emailError.textContent ==="" && passwordError.textContent === "" && confirmPasswordError.textContent === "" && phoneNumberError.textContent ==="")
    {
      console.log("every thing okay");
      
      axios.post("/users/add",{
        ...registrationDetials
      }).then((res) => {console.log(res.data)
        if(res.data.success === true)
        {
          setRegistrationStatusMsg("Registration successful");
          var pElement = document.getElementById("statusMsg") as HTMLParagraphElement;
          pElement.classList.remove("statusFailureMsg"); 
          pElement.classList.add("statusSuccessMsg"); 
          setTimeout(()=>{
              setLogin(true);
          },1000)
        }
        else
        {
          setRegistrationStatusMsg("Email Already exists");
          var pElement = document.getElementById("statusMsg") as HTMLParagraphElement;
          pElement.classList.remove("statusSuccessMsg"); 
          pElement.classList.add("statusFailureMsg"); 
        }
      })
      .catch((err) => console.log(err))
    }
  }

    // var newUser = new User(registrationDetials.name,registrationDetials.emailId,registrationDetials.password,registrationDetials.confirmPassword,+registrationDetials.phoneNumber);

    // validate(newUser)
    // .then((errs) => {
    //   if(errs.length>0)
    //   {

        // console.log("validation errors");
        // console.log(errs);
        // var lis = ["name","emailId","password","confirmPassword",""];
        // for(var i=0;i<errs.length;i++)
        // {
        //     const index = lis.indexOf(errs[i].property, 0);
        //     if (index > -1) {
        //       lis.splice(index, 1);
        //     }
        //   var arr = errs[i].constraints;
        //   console.log(arr);
    
          
        //     document.getElementsByClassName("error"+errs[i].property)[0]!.textContent = arr!=undefined?Object.values(arr)[0]:"";
        //   console.log(errs[i]);
        // }

        // console.log(lis);
        
        // for(var it of lis)
        // {
        //   document.getElementsByClassName("error"+it)[0]!.textContent = "";
        // }
        // if(registrationDetials.password !== registrationDetials.confirmPassword)
        // {
        //   document.getElementsByClassName("errorconfirmPassword")[0]!.textContent = "Passwords did Not Match";
        // }
        // else
        // {
        //   document.getElementsByClassName("errorconfirmPassword")[0]!.textContent = "";
        // }
      // }
      // else{
        
    // .catch((err) => console.log(err))
    //     console.log(newUser.emailId);
    //   }
    // })
  // }

  const loginUser = () => {

    var lemailError = document.getElementsByClassName("lemailerror")[0]! as HTMLParagraphElement;
    var lPasswordError = document.getElementsByClassName("lpassworderror")[0]! as HTMLParagraphElement;

    var lemailRegexp = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);



    // email validation
    if(loginDetials.emailId === "")
      lemailError.textContent = "Enter Email";
    else if(!lemailRegexp.test(loginDetials.emailId))
      lemailError.textContent = "Invalid email"
    else
      lemailError.textContent = ""

    // password validation
    if(loginDetials.password === "")
      lPasswordError.textContent = "Enter password";
    else
      lPasswordError.textContent = "";

    
    if(lemailError.textContent === "" && lPasswordError.textContent === "")
    {
      axios.post("/users/login",{
      ...loginDetials
    })
    .then((res) => {
      if(res.data.success)
      {
        userContext?.toggleUser(res.data.user);
        var pElement = document.getElementById("statusLMsg") as HTMLParagraphElement;
        pElement.classList.remove("statusLFailureMsg"); 
        pElement.classList.add("statusLSuccessMsg"); 
        setLoginStatusMsg("Login Sucessfull");
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        setUser(res.data.user);
        setTimeout(() =>
        {
          nav("/");
        },1000);
      }
      else
      {
        setLoginStatusMsg("Invalid Credentials");
        var pElement = document.getElementById("statusLMsg") as HTMLParagraphElement;
        pElement.classList.remove("statusLSuccessMsg"); 
        pElement.classList.add("statusLFailureMsg"); 
      }
    }).then(() => console.log(userContext?.user?.name))
    .catch((err) => console.log(err))
    }
    
  }

    return <div className="registration-page">
        {!login?<form style={{"padding":"10px 10px 20px 10px","textAlign":"left"}}>
                  <div className="statusMessage"><p id="statusMsg" className="statusMsg">{registrationStatusMsg}</p></div>
                  <TextField
                      className="textField"
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      type="text"
                      fullWidth
                      variant="standard"
                      style={{marginTop:"0px"}}
                      name="name"
                      value={registrationDetials.name}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChangeRegistrationInput(e.target.name,e.target.value)}}
                    required/>
                    <p className="error errorname"></p>
                    <TextField
                      className="textField"
                      margin="dense"
                      id="emailId"
                      name="emailId"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                      value={registrationDetials.emailId}
                      style={{marginTop:"0px"}}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChangeRegistrationInput(e.target.name,e.target.value)}} 
                    required/>
                    <p className="error erroremailId"></p>
                    <TextField
                      className="textField"
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      value={registrationDetials.password}
                      style={{marginTop:"0px"}}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChangeRegistrationInput(e.target.name,e.target.value)}} 
                    required/>
                    <p className="error errorpassword"></p>
                    <TextField
                      className="textField"
                      margin="dense"
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      value={registrationDetials.confirmPassword}
                      style={{marginTop:"0px"}}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChangeRegistrationInput(e.target.name,e.target.value)}} 
                    required/>
                    <p className="error errorconfirmPassword"></p>
                    <TextField
                      className="textField"
                      margin="dense"
                      id="mobileNumber"
                      name="phoneNumber"
                      label="Mobile"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={registrationDetials.phoneNumber}
                      style={{marginTop:"0px"}}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChangeRegistrationInput(e.target.name,e.target.value)}} 
                    required/>
                    <p className="error errorphoneNumber"></p>
                    <button  className="form-control btn btn-dark register-btn" onClick={(e:React.MouseEvent<HTMLButtonElement>) =>{
                      e.preventDefault();
                      registerUser();
                    } }>
                        Register
                    </button>
                    <div className="do-not-have-account-btn" style={{textAlign:"center",width:"100%",margin:"10px 0px 20px 0px",display:"inline-block"}}>
                    <p> Already have an account? <a href="#" onClick={()=>{
                      
                      setLogin(true);
                    }}>Login</a></p>
                  </div>
                </form>:
                <form style={{"padding":"30px 10px","textAlign":"left"}}>
                  <div className="statusLMessage"><p id="statusLMsg" className="statusLMsg">{loginStatusMsg}</p></div>
                  <TextField
                    className="textField"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    name="emailId"
                    fullWidth
                    variant="standard"
                    value={loginDetials.emailId}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChangeLoginInput(e.target.name,e.target.value)}} 
                    style={{"marginBottom":"10px",marginTop:"0px"}}  
                  required/>
                    <p className="error lemailerror"></p>
                  <TextField
                    className="textField"
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    variant="standard"
                    value={loginDetials.password}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChangeLoginInput(e.target.name,e.target.value)}} 
                    style={{"marginBottom":"10px",marginTop:"0px"}}
                  required/>
                    <p className="error lpassworderror"></p>
                    <button  className="form-control btn btn-dark login-btn" type="submit" onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      loginUser();
                    }}>
                        Login
                    </button>
                  <div className="do-not-have-account-btn" style={{textAlign:"center",width:"100%",margin:"10px 0px 20px 0px",display:"inline-block"}}>
                    <p> Don't have an account? <a href="#" onClick={() => {
                      setLogin(false);
                      // document.getElementsByClassName("errorname")[0]!.textContent = "";
                      // document.getElementsByClassName("erroremailId")[0]!.textContent = "";
                      // document.getElementsByClassName("errorpassword")[0]!.textContent = "";
                      // document.getElementsByClassName("errorconfirmPassword")[0]!.textContent = "";
                      // document.getElementsByClassName("errorphoneNumber")[0]!.textContent = ""
                    }}>Register</a></p>
                  </div>
                </form>
        }
    </div>
}



export default Registration;