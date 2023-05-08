import React, { useEffect, useState } from "react";
import styles from "./form.module.css"
import { Link, useNavigate } from "react-router-dom";
import {useGetFormInfoQuery} from "../../reduxToolKit/api"
function SignIn() {
    const[formInfo,setFormInfo] = useState({
        email: "",
        password: ""
    });

    const [errorMessgae,setErrorMessage] = useState("")

    let flag = false

    

    const {data} = useGetFormInfoQuery()
    console.log(data)
    
    
    const navigate = useNavigate()

    const handelForm = (e) =>{
        e.preventDefault()

        
          flag = data.some((form) => {
            return formInfo.email === form.email && formInfo.password === form.password;
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
      },2000)
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