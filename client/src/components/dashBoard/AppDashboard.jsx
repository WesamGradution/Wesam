import React, { useMemo } from 'react'
import {CssBaseline,ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import {themeSettings} from "./theme"
import { useSelector } from 'react-redux'
import {  Route, Routes } from 'react-router-dom'

import Dashboard from "./scenes/dashboard"
import Layout from './scenes/layoutt'
import { Users } from './scenes/users'
import { AddUser } from './scenes/addUser'
import QuizCreator from "./scenes/quizCreator"
import CreateGroup from './scenes/groups'
import AddToGroup from './scenes/assignToGroup'
import Opportunity from './scenes/opportunity'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import AddProduct from './scenes/addProducts'
import Product from './scenes/products'
import Transaction from './scenes/transaction'
import UpdateUser from './scenes/updateUser'
import DeleteUser from './scenes/deleteUser'
import GroupInformation from './scenes/groupInformation'
import GroupComponent from '../groupComponent'
import JoinGroup from '../joinGroup'
import CustomeRoute from '../customeRoutre'
import ShowOpprtunities from './scenes/showOpportunites'
import OpportunuteMembers from './scenes/opportunutesMembers'
import System from '../system'
import ShowCompetition from './scenes/showCompetition'
import ShowQuizData from './scenes/showCompetition/showQuizDarta'
import ShowTransaction from './scenes/transaction/showTransaction'

const AppDashboard = () => {
    const mode = useSelector((state) => state.global.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])
  return (

    <div>
    
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        
            <Routes>

            <Route path='/dashboard/createAdmin' element={<System/>}></Route>

              <Route element = {<Layout/>}>
              <Route path="dashboard" element={<CustomeRoute authorize={true} component={<Dashboard />} />} />
              <Route path="Users" element={<CustomeRoute authorize={true} component={<Users />} />} />
              <Route path="Add user" element={<CustomeRoute authorize={true} component={<AddUser />} />} />
              <Route path="Add Competition" element={<CustomeRoute authorize={true} component={<QuizCreator />} />} />
              <Route path="Show Competition" element={<CustomeRoute authorize={true} component={<ShowCompetition />} />} />
              <Route path="Show quiz data" element={<CustomeRoute authorize={true} component={<ShowQuizData />} />} />
              <Route path="create group" element={<CustomeRoute authorize={true} component={<CreateGroup />} />} />
              <Route path="Show Groups" element={<CustomeRoute authorize={true} component={<AddToGroup />} />} />
              <Route path="Add Opportunity" element={<CustomeRoute authorize={true} component={<Opportunity />} />} />
              <Route path="Show Opportunity" element={<CustomeRoute authorize={true} component={<ShowOpprtunities />} />} />
              <Route path="add product" element={<CustomeRoute authorize={true} component={<AddProduct />} />} />
              <Route path="show product" element={<CustomeRoute authorize={true} component={<Product />} />} />
              <Route path="Send Transactions" element={<CustomeRoute authorize={true} component={<Transaction />} />} />
              <Route path="Show Transactions" element={<CustomeRoute authorize={true} component={<ShowTransaction />} />} />
              <Route path="Update User" element={<CustomeRoute authorize={true} component={<UpdateUser />} />} />
              <Route path="Delete User" element={<CustomeRoute authorize={true} component={<DeleteUser />} />} />
              <Route path="/groups/information/:groupId" element={<CustomeRoute authorize={true} component={<GroupInformation />} />} />
              <Route path="/opprtunities/information/:oppId" element={<CustomeRoute authorize={true} component={<OpportunuteMembers />} />} />
              </Route>
            </Routes>
            
        </ThemeProvider>
     
    </div>
  )
}

export default AppDashboard;