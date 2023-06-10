import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../reduxToolKit/userSlice'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from "react-router-dom";
const RouterCheckingUser = ({ component, authorize }) => {

     // get the user state from redux
  const user = useSelector(selectUser);

  // return a Route component with the same props
  return (authorize ? <component/> : <Navigate to="/"/>)
}

export default RouterCheckingUser