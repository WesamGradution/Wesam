import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Select,
} from "@mui/material";
import Header from '../../../Header';
import { useGetStoreInfoQuery } from '../../../../reduxToolKit/api';
import { Menu as MenuIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../reduxToolKit/userSlice";

export  const Product = ()=> {
  // An array of card data
  const theme = useTheme()
  const {_id} = useSelector(selectUser)
  const {data,isLoading,isError} = useGetStoreInfoQuery(_id)
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Return an error message if there is an error
  if (isError) {
    return <div>Error: {isError.message}</div>;
  }


  function GroupButton(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleChange = (event) => {
      // send to server logic
      handleClose();
    };
  
    return (
      <>
        <Button
          id="group-button"
          variant="contained"
          color="primary"
          onClick={handleClick}
          startIcon={<MenuIcon />}
        >
          Groups
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "group-button",
          }}
        >
          {props.options.map((option) => (
            
            <MenuItem key={option} value={option} onClick={handleChange}>
            
              {option.title}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }



    const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
    },
    {
      field: "pricePoint",
      headerName: "Price Point",
      flex: 0.5,
    },
    {
      field: "group_id",
      headerName: "Group ID",
      flex: 0.5,
      renderCell: (params) => {
        // get the options from the params.value, which is an array of ObjectIds
        const options = params.value;
        // return the custom component with the options
        return <GroupButton options={options} />;
      },

    },
      
  ];


  return (
    <Box m="1.5rem 2.5rem">
      <CssBaseline />

      <Header title="Product" subtitle="List of Product " />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          //onCellClick={handleCellClick}
          columns={columns}
          checkboxSelection
          //onRowSelectionModelChange={(newRowSelectionModel) => {
          //setRowSelectionModel(newRowSelectionModel);
          //}}
          //rowSelectionModel={rowSelectionModel}
          error={isError ? "No opportunity found" : null}
        />
      </Box>
    </Box>
  );
}

export default Product;