import React, { useEffect, useState } from "react";
import styles from "./form.module.css"
import { useDispatch, useSelector } from "react-redux";
import { createForm,getForms } from "../../actions/form";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const[formInfo,setFormInfo] = useState({
        email: "",
        password: ""
    });

    const [errorMessgae,setErrorMessage] = useState("")

    const dispatch = useDispatch();

    let flag = false

    

    useEffect(() =>{
      dispatch(getForms())
      
    },[])

    const forms = useSelector((state) => state.form)
    console.log(forms)
    
    
    const navigate = useNavigate()

    const handelForm = (e) =>{
        e.preventDefault()

        forms.forEach((form) =>{
          if (formInfo.email === form.email && formInfo.password === form.password){
            flag = true
            
          }else {
            flag = false
          }

        })

        if (flag === false){
          setErrorMessage("email or password is not correct")
        }else if (flag === true){
          naviHome()
        }
        
        

        
    }

    function naviHome(){
      setTimeout(() =>{
        navigate("/home")
      },5000)
    }


    return(
        
      <div className={styles.container}>
            <h1 className={styles.container.h1}>Sign in </h1>
            <p>{errorMessgae}</p>
          <form  onSubmit={handelForm}  >

            <input name="email" placeholder="email" value={formInfo.email} className={styles.input}
            onChange={(e) => setFormInfo({...formInfo,email:e.target.value})} />

            <input name="password" placeholder="password" value={formInfo.password} type="password" className={styles.input}
            onChange={(e)=> setFormInfo({...formInfo,password:e.target.value})} ></input>
            <button className={styles.button}>Submit</button>
            <br/>
            <p>You don't have account? <Link to="/signUp">Sign up</Link> </p>
        </form>
          
      </div>
      
    )
}

export default SignIn;