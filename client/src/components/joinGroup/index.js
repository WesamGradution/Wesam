import React, { useEffect } from 'react'

import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useGetGroupInfoQuery, usePostGroupjoinMutation } from '../../reduxToolKit/api'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reduxToolKit/userSlice'
import GroupComponent from '../groupComponent'

const JoinGroup = () => {

    
    
    const user = useSelector(selectUser)
    
    
    const location = useLocation()
    

   
    
    
    if (!user || user.admin){
        return <Navigate to="/" state={{from:location}}/>
    }

    return <GroupComponent  />;

   
   
  
}

export default JoinGroup;