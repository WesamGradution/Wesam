import React, { useState,useEffect } from 'react'
import * as yup from "yup"
import Header from '../../../Header'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import { useGetGroupInfoQuery, usePostGroupInfoMutation } from '../../../../reduxToolKit/api'
const CreateGroup = () => {

    const initialValues  = {
        title:"",
        description:"",
    }

    const groupSchema = yup.object().shape({
        title:yup.string().required("required"),
        description:yup.string().required("required")
    })

    const [postGroupInfo,{data}] = usePostGroupInfoMutation()
    const [groupUrl,setGroupUrl] = useState("")
    


    const handelFormSubmit = (values,{resetForm}) =>{
        console.log(values)
        postGroupInfo(values).then(data =>{

            
            if (!data) { 
                console.log("whait") 
        }else{
            const {groupSchema,url} = data
            setGroupUrl(data.data)
            console.log('apollo', data.data);

        }
            
            
            
        }).catch(error =>{
            console.log(error)
        })

        resetForm();
    }

    
   

    
    console.log(groupUrl)

  return (
    <Box m="20px">

        <Header title="CREATE GROUP" subtitle="Create a New Group"></Header>
    
        <Formik
        onSubmit={handelFormSubmit}
        initialValues={initialValues}
        validationSchema={groupSchema}
        >
        {({values,errors,touched,handleBlur,handleChange,handleSubmit})=>{
            return (
                <form onSubmit={handleSubmit}>
                    <Box display="grid" gap="30px">

                        <TextField
                        fullWidth
                        variant='filled'
                        type='text'
                        label="title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        name='title'
                        error={!!touched.title && errors.title}
                        helperText={touched.title && errors.title}
                        sx={{gridColumn:"span 1"}}
                        
                        />
                        <TextField
                            fullWidth
                            variant='filled'
                            type='text'
                            label="description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            name='description'
                            error={!!touched.title && errors.title}
                            helperText={touched.title && errors.title}
                            sx={{gridColumn:"span 1"}}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end" m="20px">
                        <Button type='submit' color='secondary' variant='contained'>
                            Create New Group
                        </Button>
                    </Box>
                    <Box display="flex" justifyContent="start" m="20px">
                        <Typography type='submit' color='secondary' variant='contained'>
                            your url is : {groupUrl}
                        </Typography>
                    </Box>

                </form>
            )
        }}




        </Formik>
    </Box>
  )
}

export default CreateGroup;