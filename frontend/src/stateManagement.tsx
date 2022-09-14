import { createGlobalState } from 'react-hooks-global-state';

export const { useGlobalState } = createGlobalState({
  user:{
    _id:"",
    name:"",
    password:"",
    emailId:"",
    phoneNumber:"",
    rank:0,
    isAdmin:false,
    _v:0
  }
});