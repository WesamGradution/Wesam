import React, { useState } from "react";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { createForm,getForms } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const[formInfo,setFormInfo] = useState({
        email: "",
        password: ""
    });

    const [errorMessgae,serErrorMessage] = useState("")

    const dispatch = useDispatch();
    dispatch(getForms())

    const forms = useSelector((state) => state.form)
    
    const navigate = useNavigate()
    const handelForm = (e) =>{
        e.preventDefault()

        forms.forEach((form) =>{
          if (formInfo.email === form.email && formInfo.password === form.password){
            naviHome()
          }else{
            serErrorMessage("email or password is not correct")
          }

        })
        

        
    }

    function naviHome(){
      setTimeout(() =>{
        navigate("/home")
      },1000)
    }


    return(
        <>
        <h1>Sign in </h1>
        <p>{errorMessgae}</p>
      <form  onSubmit={handelForm} >

        <input name="email" placeholder="email" value={formInfo.email}
        onChange={(e) => setFormInfo({...formInfo,email:e.target.value})} />

        <input name="password" placeholder="password" value={formInfo.password} type="password"
        onChange={(e)=> setFormInfo({...formInfo,password:e.target.value})} ></input>
        <button>Submit</button>
      </form>
      <br/>
      <p>You don't have account? <Link to="/signUp">Sign up</Link> </p>
      </>
    )
}

export default SignIn;