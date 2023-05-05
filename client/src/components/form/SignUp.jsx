import React, { useEffect, useState } from "react";
import styles from "./form.module.css"
import { useGetFormInfoQuery,usePostFormInfoMutation } from "../../reduxToolKit/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function SignUp() {
    const[formInfo,setFormInfo] = useState({
        username:"",
        email: "",
        password: ""
    });

    const [errorText,setErrorText] = useState("")
    

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const {data, isLoading, isSuccess} = useGetFormInfoQuery()
    const [postFormInfo] = usePostFormInfoMutation()

    console.log(data)

    const handelForm = (e) =>{
        e.preventDefault()
        
        if (isLoading) {
          // show loading indicator
        } else if (isSuccess) {
          // check data
          data.forEach((form) =>{
                    
            if (formInfo.username === form.username){
              setErrorText("user name already taken")
            }else if (formInfo.email === form.email){
              setErrorText("the email aleady taken")
            }else{
              console.log("work")
              setErrorText("")
              postFormInfo(formInfo)
              naviHome() // trigger mutation
            }
          })
        }
         
    }

    const naviHome = () => { setTimeout(() => { navigate("/home") },2000) }
    


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