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

const AppDashboard = () => {
    const mode = useSelector((state) => state.global.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])
  return (

    <div>
        <ThemeProvider theme={theme}>
        <ScopedCssBaseline>
        <CssBaseline/>
            <Routes>
              <Route element = {<Layout/>}>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
              <Route path='show users' element={<Users/>}></Route>
              <Route path="Add user" element={<AddUser/>}></Route>
              <Route path='Add Quiz' element={<QuizCreator/>}></Route>
              <Route path='create group' element={<CreateGroup/>}></Route>
              <Route path='assign users' element={<AddToGroup/>}></Route>
              <Route path='Add Opportunity' element={<Opportunity/>}></Route>
              <Route path='add product' element={<AddProduct/>}></Route>
              <Route path='show product' element={<Product/>}></Route>
              <Route path='Manage Transactions' element={<Transaction/>}></Route>
              </Route>
            </Routes>
            </ScopedCssBaseline>
        </ThemeProvider>
    </div>
  )
}

export default AppDashboard;