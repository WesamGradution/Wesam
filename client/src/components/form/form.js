import React, { useState } from "react";
import "./style.css"
import axios from "axios";
import { useDispatch } from "react-redux";
import { createForm } from "../../actions/posts";
import { useSelector } from "react-redux";

function Form() {
    const[formInfo,setFormInfo] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    const handelForm = (e) =>{
        e.preventDefault()

        dispatch(createForm(formInfo))
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