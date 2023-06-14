import React from 'react'
import { useGetFormInfoQuery } from '../../reduxToolKit/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../reduxToolKit/userSlice';

const HandleGoHome = ({userId}) => {

    const { data } = useGetFormInfoQuery(userId);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Dispatch the action to update the user with the data
    dispatch(updateUser(data));

    
  
    // Navigate to the home page
    navigate("/home");
  
    // Reload the window
  
}

export default HandleGoHome