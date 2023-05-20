import React, { useRef } from 'react'
import { Formik } from 'formik';
import * as yup from "yup"
import Header from '../../../Header';
import { Box ,TextField,Button,InputLabel, Typography,MenuItem} from '@mui/material';
import { Label } from '@mui/icons-material';
import { useGetGroupInfoQuery, usePostStoreInfoMutation } from '../../../../reduxToolKit/api';


const AddProduct = () => {
    const {data} = useGetGroupInfoQuery()
    const [postItem] = usePostStoreInfoMutation()

    const handleStoreSubmit = (values) =>{
        
        console.log(values)
        postItem(values)

    }


    const initialValues = {
        group_id:"",
        name:"",
        description:"",
        quantity:"",
        pricePoint:"",
        itemPicture:""

    }

    const storeSchema = yup.object().shape({
        group_id:yup.string().required("required"),
        name:yup.string().required("required"),
        description:yup.string().required("required"),
        quantity:yup.string().required("required"),
        pricePoint:yup.string().required("required"),
        //itemPicture:yup.string().required("required")
    })
  return (
    <Box m="20px">
        <Header title="CREATE ITEM" subtitle="Add New Item To Store"></Header>

        <Formik
        onSubmit={handleStoreSubmit}
        initialValues={initialValues}
        validationSchema={storeSchema}
        >
            {({values,errors,touched,handleBlur,handleChange,handleSubmit})=>{

                return (
                    
          <form onSubmit={handleSubmit}>
          <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax (0,1fr))">
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            name="name"
            error={!!touched.name && errors.name }
            helperText={touched.name && errors.name}
            sx={{gridColumn:"span 1"}}
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
            sx={{gridColumn:"span 1"}}
            />
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "Quantity"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.quantity}
            name="quantity"
            error={!!touched.quantity && errors.quantity }
            helperText={touched.quantity && errors.quantity}
            sx={{gridColumn:"span 1"}}
            />
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "Price Point"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.pricePoint}
            name="pricePoint"
            error={!!touched.pricePoint && errors.pricePoint }
            helperText={touched.pricePoint && errors.pricePoint}
            sx={{gridColumn:"span 1"}}
            />
            {/*<Typography variant='button'>Upload Picture: </Typography>
            <TextField
             fullWidth
             type = "file"
             onBlur={handleBlur}
             onChange={handleChange}
             value={values.itemPicture}
             name="itemPicture"
             error={!!touched.itemPicture && errors.itemPicture }
             helperText={touched.itemPicture && errors.itemPicture}
             sx={{gridColumn:"span 1", border: 0, outline: "none"}} 
                  
                /> */}
            <TextField
             fullWidth
             type = "text"
             label = "Choose Group"
             onBlur={handleBlur}
             onChange={handleChange}
             value={values.group_id}
             name="group_id"
             error={!!touched.group_id && errors.group_id }
             helperText={touched.group_id && errors.group_id}
             sx={{gridColumn:"span 1"}}
             select 
                  
                >
                { data && data.map((d)=>{
                    return <MenuItem value={d._id}>{d.title}</MenuItem>;
                })}

                </TextField>
            
            </Box>
            <Box display="flex" justifyContent="end" m="20px">
            <Button type='submit' color='secondary' variant='contained' >
              Upload ITEM 
            </Button>
            </Box>
            </form>
                )
            }}

        </Formik>
        {/*<Box display="flex" justifyContent=" start" mt="20px">
          
            <input
            accept=".csv"
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            id="file-input"
          />
          <InputLabel htmlFor="file-input">
            <Button variant="contained" color="secondary" component="span" onClick={handelFileUpload}>
              Upload CSV FILE 
            </Button>
            </InputLabel>
            
          
        </Box>*/}

    </Box>
  )
}

export default AddProduct;