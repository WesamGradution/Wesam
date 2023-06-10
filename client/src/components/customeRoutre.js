import { Outlet, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../reduxToolKit/userSlice';

const CustomeRoute = ({ authorize,component}) => {

 const user = useSelector(selectUser)


 const userRole = user.admin === authorize

 const auth = userRole === authorize
 
 
 


 return (auth ? component :<Navigate to="/" />)
}

export default CustomeRoute;