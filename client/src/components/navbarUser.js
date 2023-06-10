import React,{useEffect} from 'react'
import { AppBar, Box, IconButton, InputBase, Toolbar, useTheme ,Typography} from '@mui/material'
import FlexBetween from './FlexBetween'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { logOutUser, selectUser, updateUser } from '../reduxToolKit/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import '@fontsource/raleway/300.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';



const NavbarUser = () => {

    useEffect(() => {

    
    // set the style of the body element
    document.body.style.fontFamily = "Source Sans Pro";
    document.body.style.color = "white";
    document.body.style.fontWeight = "300";
    document.body.style.background = "#50a3a2";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    // return a function to reset the style when the component unmounts
    return () => {
      document.body.style.fontFamily = null;
      document.body.style.color = null;
      document.body.style.fontWeight = null;
      document.body.style.background = null;
      document.body.style.width = null;
      document.body.style.height = null;
    };
  }, []); 

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user  = useSelector(selectUser)
    console.log("🚀 ~ file: navbarUser.js:43 ~ NavbarUser ~ user:", user)

    if (!user){
      return <Navigate to="/"/>
    }
  
    
    const userName = user.firstName +"  "+user.lastName
    let userPoints = user.points
   


 

  const handleLogOut = ()=>{
    
    dispatch(logOutUser())
    navigate("/")

  }


     





  return (

    <Box>
    
    <AppBar sx={{
        position:"static",
        background: " #3f8180 ",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" 
        
    }
    }
    
    >
        <Toolbar sx={{justifyContent:"space-between"}}>
        {/* LEFT SIDE */}
            <FlexBetween>
                <Typography variant="h4" fontWeight="bold" sx={{fontFamily:"Ralway"}}> 
                        WESAM
                </Typography>
               
                <FlexBetween >
                
                </FlexBetween>
            </FlexBetween>

            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
              <IconButton onClick={handleLogOut}>
                    <LogoutIcon />
                </IconButton>
                <Typography>
                {userName } ({userPoints})
                </Typography>
                
            </FlexBetween>
        </Toolbar>
        
        
    </AppBar>
    <Outlet/>

    </Box>
  )
}

export default NavbarUser;