import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../reduxToolKit/userSlice';

const Dashboard = () => {

  const user = useSelector(selectUser)
  console.log("🚀 ~ file: index.js:8 ~ Dashboard ~ user:", user)
  
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard;