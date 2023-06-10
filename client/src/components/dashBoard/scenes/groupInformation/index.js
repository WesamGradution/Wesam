import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetGroupInfoQuery, useGetMembersOfGroupQuery } from '../../../../reduxToolKit/api'
import Users from '../users'

const GroupInformation = () => {

    const params = useParams()
    const {groupId} = params
    
  
    const {data,isLoading,error} = useGetMembersOfGroupQuery(groupId)
    if (isLoading){
      return <div>Loading ...</div>
    }else if (error){
      return <div>something is wrong ...</div>
    }
    console.log("🚀 ~ file: index.js:12 ~ GroupInformation ~ data:", data)

    if (isLoading){
        return <div> loading...</div>
    }else if (error){
        return <div> error..</div>
    }

    

  return (
    <Users
    data={data}
    ></Users>

  )
}

export default GroupInformation