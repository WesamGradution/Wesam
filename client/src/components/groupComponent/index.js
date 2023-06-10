import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  useGetGroupInfoQuery,
  useJoinGroupMutation,
} from "../../reduxToolKit/api";
import {
  Box,
  Button,
  CssBaseline,
  Typography,
  typography,
} from "@mui/material";
import { logOutUser, selectUser } from "../../reduxToolKit/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

const customTheme = createTheme({
  typography: {
    fontFamily: "Source Sans Pro",
    color: "white",
    fontWeight: 300,
  },
  Button: {},

  palette: {
    background: {
      default: "#50a3a2",
    },
    primary: {
      main: "#0f4c75",
    },
    secondary: {
      main: "#3282b8",
    },
    success: {
      main: "#bbe1fa",
    },
  },
});

const GroupComponent = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const [joinGroup] = useJoinGroupMutation();
  const { data, isLoading, isError } = useGetGroupInfoQuery(groupId);

  const user = useSelector(selectUser);
  const userId = user._id;

  if (isLoading) {
    return <div>loading ..</div>;
  } else if (isError) {
    return <div> Error..</div>;
  }

  console.log("🚀 ~ file: index.js:32 ~ GroupComponent ~ data:", data);

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  const handleJoinGroup = () => {
    joinGroup({ groupId, userId });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(6, minmax(100px, auto))",
          alignItems: "center",
          justifyContent: "center",
          height: "65vh", // full viewport height
          gap: 2,
        }}
      >
        <Box
          sx={{
            gridColumnStart: "span 12",
            gridRowStart: "span 1",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
 
        </Box>
        <Box
          sx={{
            gridColumnStart: "span 12",
            gridRowStart: "span 1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PeopleIcon sx={{ fontSize: "80px", color: "#bbe1fa" }} />
        </Box>
        <Box
          sx={{
            gridColumnStart: "span 12",
            gridRowStart: "span 2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" textAlign="center" m="10px">
            {data.title}
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumnStart: "span 12",
            gridRowStart: "span 1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" textAlign="center">
            {data.description}
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumnStart: "span 12",
            gridRowStart: "span 1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleJoinGroup}
            variant="contained"
            color="success"
            size="large"
          >
            Join To Group
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default GroupComponent;
