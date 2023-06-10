import React from 'react'
import { useParams } from 'react-router-dom'
import {  useGetOpportunityMembersQuery } from '../../../../reduxToolKit/api'
import Users from '../users'

const OpportunuteMembers = () => {

    const params = useParams()
    
    const {oppId} = params
    console.log("🚀 ~ file: index.js:9 ~ OpportunuteMembers ~ id:", oppId)
   
    const {data,isLoading,isError} =  useGetOpportunityMembersQuery(oppId)

    if (isLoading){
        return <div>loading</div>
    }else if (isError){
        return <div>errorsss</div>
    }

    
  return (
    <Users
    data={data}
    >

    </Users>
  )
}

export default OpportunuteMembers