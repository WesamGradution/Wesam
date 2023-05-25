import React from 'react'
import { useGetGroupInfoQuery } from '../../reduxToolKit/api'

const GroupComponent = (props) => {
    console.log("the id for the groupComponent is :" + props.id)

    const {data,isLoading} = useGetGroupInfoQuery(props.id)
    
    if (isLoading){
        return <div> is loading ...</div>
    }

  return (
    <div>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
    </div>
  )
}

export default GroupComponent;