import React , { useRef, useState } from 'react'
import { Box,Button,TextField,InputLabel,MenuItem,Select,Checkbox,FormGroup, FormControlLabel } from '@mui/material'
import {Formik} from "formik"
import * as yup from "yup"
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../../Header"
import { useGetAdminGroupQuery, useGetGroupInfoQuery, usePostOpportunityInfoMutation } from '../../../../reduxToolKit/api'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../reduxToolKit/userSlice'

const Opportunity = () => {
    const {_id} = useSelector(selectUser)
    const {data} = useGetAdminGroupQuery(_id)
    const [postOpportunity] = usePostOpportunityInfoMutation()

    const handelFormSubmit = (values,{resetForm}) => {
        console.log('🚀 ~ file: index.jsx:11 ~ handelFormSubmit ~ values:',values);
        
        postOpportunity(values)
        resetForm()
      
      }

      let numbers = []

      for ( let i = 0; i <= 50; i++){
        numbers.push(i)
      }
      

 
    const initialValues = {
        group_id:[],
        title :"",
        description :"",
        pointAmount :"",
        userLimit :"",
        admins:[_id]
      }
    
      
      const userSchema = yup.object().shape({
        title:yup.string().required("required"),
        description:yup.string().required("required"),
        pointAmount:yup.string().required("required"),
        userLimit:yup.string().required("required"),
      })
    
      return (
        <Box m="20px">
    
        <Header title="CREATE OPPORTUNITY" subtitle="Create a New Opportunity"></Header>    
    
        <Formik
        onSubmit={handelFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        >
    
          {({values,errors,touched,handleBlur,handleChange,handleSubmit})=>{
            return (
    
              <form onSubmit={handleSubmit}>
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax (0,1fr))">
                <TextField
                fullWidth
                variant = "filled"
                type = "text"
                label = "Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && errors.title }
                helperText={touched.title && errors.title}
                sx={{gridColumn:"span 4"}}
                />
                <TextField
                fullWidth
                variant = "filled"
                type = "text"
                label = "Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && errors.description }
                helperText={touched.description && errors.description}
                sx={{gridColumn:"span 4"}}
                />
                <TextField
                fullWidth
                variant = "filled"
                type = "text"
                label = "Point Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pointAmount}
                name="pointAmount"
                error={!!touched.pointAmount && errors.pointAmount }
                helperText={touched.pointAmount && errors.pointAmount}
                sx={{gridColumn:"span 2"}}
                select 
                >
                {numbers.map((number) =>{
                    return <MenuItem value={number}> {number}</MenuItem>
                })}
                   
                </TextField>
                <TextField
                fullWidth
                variant = "filled"
                type = "text"
                label = "User Limit"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userLimit}
                name="userLimit"
                error={!!touched.userLimit && errors.userLimit }
                helperText={touched.userLimit && errors.userLimit}
                sx={{gridColumn:"span 2"}}
                select
                > 
                {numbers.map((number) =>{
                    return <MenuItem value={number}> {number}</MenuItem>
                })}
                </TextField>
                
                
                <Box display="flex" justifyContent="start"  sx={{flexDirection:"column"}} >
                
                
    
                <InputLabel id="demo-simple-select-label" sx={{ marginRight: 1 }}> Group:</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.group_id}
                    label="Group Number"
                    onChange={handleChange}
                    name="group_id"
                    variant="standard"
                    multiple
                    sx={{gridAutoColumn:"span 1"}}
                    
                  >
                    {data && data.map((data) =>{
                        return <MenuItem value={data._id}>{data.title}</MenuItem>
                    })}
                  </Select>
              
              </Box>    
              
              </Box>
              
              
            <Box display="flex" justifyContent="end" mt="-20px">
                <Button type='submit' color='secondary' variant='contained' >
                  Create New Opportunity
                </Button>
              </Box>
              
            </form>
            
            )
            
          }}
        </Formik>
    
    
        </Box>
      )
    }

export default Opportunity;