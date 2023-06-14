import React from "react";
import { useGetTransactionAdminQuery } from "../../../../reduxToolKit/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../reduxToolKit/userSlice";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Typography,
  useTheme,
} from "@mui/material";

const ShowTransaction = () => {
  const { _id } = useSelector(selectUser);
  const { data, isLoading, isError } = useGetTransactionAdminQuery(_id);

  const theme = useTheme();

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>error...</div>;
  console.log(
    "🚀 ~ file: showTransaction.js:20 ~ ShowTransaction ~ data:",
    data
  );

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "pointAmount",
      headerName: "Point",
      flex: 1,
    },
    {
      field: "receive_member_id.name",
      headerName: "Receive Member Name",
      flex: 1,
      // Use valueGetter to return the name of the receive member id
      valueGetter: (params) => {
        // Get the array of receive member id objects from the row data
        const members = params.row.receive_member_id;
        // Map each member object to a string with name
        const memberNames = members.map(
          (member) => `${member.firstName} ${member.lastName}`
        );
        // Join the strings with comma
        return memberNames.join(", ");
      },
    },
    {
      field: "receive_member_id.email",
      headerName: "Receive Member Email",
      flex: 1,
      // Use valueGetter to return the email of the receive member id
      valueGetter: (params) => {
        // Get the array of receive member id objects from the row data
        const members = params.row.receive_member_id;
        // Map each member object to a string with firstName and lastName
        const memberNames = members.map((member) => `${member.email} `);
        // Join the strings with commas
        return memberNames.join(", ");
      },
    },
    {
      field: "receive_member_id.phone",
      headerName: "Receive Member Phone",
      flex: 0.5,
      // Use valueGetter to return the phone number of the receive member id
      valueGetter: (params) => {
        // Get the array of receive member id objects from the row data
        const members = params.row.receive_member_id;
        // Map each member object to a string with phone number
        const memberPhones = members.map((member) => member.phoneNumber);
        // Join the strings with commas
        return memberPhones.join(", ");
      },
    },
  ];

  console.log(
    "🚀 ~ file: showTransaction.js:9 ~ ShowTransaction ~ data:",
    data
  );

  const hasReceiveMembers = (row) => {
    // Get the receive_member_id array from the row object
    const members = row.receive_member_id;
    // Check if the array has any elements
    return members.length > 0;
  };
  
  return (
    <Box m="1.5rem 2.5rem">
      <CssBaseline />

      <Header
        title="Transaction"
        subtitle="Here you can find all the transaction you made"
      />
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
          columns={columns}
          ilterModel={{
            // Use items array to specify one or more filters
            items: [
              {
                // Use columnField to specify which column to filter
                columnField: "receive_member_id",
                // Use value to specify the filter function
                value: hasReceiveMembers,
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
};

export default ShowTransaction;
