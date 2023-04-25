import React, { useEffect, useState } from "react";
import styles from "./form.module.css"
import { useDispatch, useSelector } from "react-redux";
import { createForm,getForms } from "../../actions/form";
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
                    console.log("work")
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
            },5000)
        
    }
    


    return(
        <div  >
            
                <div className={styles.container}>
                    <h1 className={styles.container.h1}>Sign up </h1>
                <form  onSubmit={handelForm} >

                    <h1 className={styles.container.h1}> {errorText}</h1>
                    <input name="email" placeholder="userName" value={formInfo.username} type ="text" required ="required" className={styles.input}
                    onChange={(e) => setFormInfo({...formInfo,username:e.target.value})} />

                    <input name="email" placeholder="email" value={formInfo.email} type ="email" required ="required" className={styles.input}
                    onChange={(e) => setFormInfo({...formInfo,email:e.target.value})} />

                    <input name="password" placeholder="password" value={formInfo.password}  type ="password" required="required" className={styles.input}
                    onChange={(e)=> setFormInfo({...formInfo,password:e.target.value})} ></input>
                    <button className={styles.button}>Submit</button>
                </form>
            </div>
        
      </div>
    )
}

export default SignUp;