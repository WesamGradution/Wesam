import React, { useRef, useState } from "react";
import {
  Box,
  useTheme,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../Header";
import { DataGrid } from "@mui/x-data-grid";
import {
  useDeleteFormMutation,
  useGetFormInfoQuery,
} from "../../../../reduxToolKit/api";

const DeleteUser = () => {
  const [deleteUser] = useDeleteFormMutation();
  const theme = useTheme();
  const { data: data_form, isLoading: isLoading_form } = useGetFormInfoQuery();

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleSubmit = async () => {
    // get the selected rows from the data array
    const selectedRows = data_form.filter((row) =>
      rowSelectionModel.includes(row._id)
    );

    // get the ids from the selected rows
    const selected = selectedRows.map((row) => row._id);
    deleteUser(selected);
    console.log(selected);

    setRowSelectionModel([]);
  };

  const isValid = rowSelectionModel.length > 0;

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "admin",
      headerName: "Admin",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Users" subtitle="List of Users" />
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
          loading={isLoading_form || !data_form}
          getRowId={(row) => row._id}
          rows={data_form || []}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>

      <Box display="flex" justifyContent="end" m="10px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Delete User/s
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteUser;
