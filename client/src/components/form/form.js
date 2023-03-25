import React, { useState } from "react";
import "./style.css"
import axios from "axios";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import * as api from "./../../API"
function Form() {
    const[formInfo,setFormInfo] = useState({
        userName: "",
        email: "",
        password: ""
    });
    //const dispatch = useDispatch();

    const handelForm = (e) =>{
        e.preventDefault()
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "Access-Control-Allow-Origin": "*",
          }
        };
        console.log(formInfo)
        axios.post("http://localhost:5000/posts",formInfo,axiosConfig).then(res => console.log(res.data))

        //api.createPost(formInfo)
        //dispatch(createPost(formInfo))
    }

    return(
        <>
        <h1>Sign in </h1>
      <form  onSubmit={handelForm} >
        <input name="fName" placeholder="First Name" value={formInfo.userName}
        onChange={(e) => setFormInfo({...formInfo,userName:e.target.value})}  />

        <input name="email" placeholder="email" value={formInfo.email}
        onChange={(e) => setFormInfo({...formInfo,email:e.target.value})} />

        <input name="password" placeholder="password" value={formInfo.password} 
        onChange={(e)=> setFormInfo({...formInfo,password:e.target.value})} ></input>
        <button>Submit</button>
      </form>
      </>
    )
}

export default Form;