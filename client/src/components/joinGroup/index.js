import React, { useEffect } from 'react'

import { Navigate, useParams } from 'react-router-dom'
import { useGetGroupInfoQuery, usePostGroupjoinMutation } from '../../reduxToolKit/api'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reduxToolKit/userSlice'
import GroupComponent from '../groupComponent'
const JoinGroup = () => {

    const {id} = useParams()
    const user = useSelector(selectUser)
    console.log("🚀 ~ file: index.js:12 ~ JoinGroup ~ user:", user)
    //const {data,isLoading} = useGetGroupInfoQuery(id)
    

   
    
    
    if (user){
        return <GroupComponent 
            id={id}
        />
    }else{
        return <Navigate to="/"/>
    }

   
   
  return (
    <div>
        
    </div>
  )
}

export default JoinGroup