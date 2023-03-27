import React, { useEffect, useState } from "react";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { createForm,getForms } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const[formInfo,setFormInfo] = useState({
        username:"",
        email: "",
        password: ""
    });

    const [errorText,setErrorText] = useState("")
    

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const forms = useSelector((state) => state.form)

    console.log(forms)

    const handelForm = (e) =>{
        e.preventDefault()
        
        if (forms.length === 0){
            dispatch(createForm(formInfo))
                naviHome()
                console.log("loop work")
        }
        else{
            forms.forEach((form) =>{
                    
                if (formInfo.username === form.username){
                    setErrorText("user name already taken")
                }else if (formInfo.email === form.email){
                    setErrorText("the email aleady taken")
                }else{
                    setErrorText("")
                    dispatch(createForm(formInfo))
                    naviHome()
                }
            })
    }
         
    }

    const naviHome = () => {
            setTimeout(() => {
                navigate("/home")
            },1000)
        
    }
    


    return(
        <>
        <h1>Sign Up </h1>
      <form  onSubmit={handelForm} >
        <h1> {errorText}</h1>
      <input name="email" placeholder="userName" value={formInfo.username} type ="text" required ="required"
        onChange={(e) => setFormInfo({...formInfo,username:e.target.value})} />

        <input name="email" placeholder="email" value={formInfo.email} type ="email" required ="required"
        onChange={(e) => setFormInfo({...formInfo,email:e.target.value})} />

        <input name="password" placeholder="password" value={formInfo.password}  type ="password" required="required"
        onChange={(e)=> setFormInfo({...formInfo,password:e.target.value})} ></input>
        <button>Submit</button>
      </form>
      </>
    )
}

export default SignUp;