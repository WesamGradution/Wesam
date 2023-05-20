import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../../../Header';
import { useGetStoreInfoQuery } from '../../../../reduxToolKit/api';
import { useTheme } from '@emotion/react';
import { Height } from '@mui/icons-material';

export  const Product = ()=> {
  // An array of card data
  const theme = useTheme()
  const {data,isLoading,error} = useGetStoreInfoQuery()
  console.log(data)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Return an error message if there is an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box m="20px">

      <Header title="STORE ITEMS" subtitle="Here All Store Items"></Header>
    
    
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} m="20px">
      {/* Map over the card data and render each card */}
      {data.map((card) => (
        <Card sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        width:"350px",
        height:"250px",
        margin:"10px",
        boxShadow:"0px 50px 8px 0 rgba(0,0,0,0.2)",
        
      }
      
      
      }>
          <CardContent>
            <Typography sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}  gutterBottom>
              {card.name}
            </Typography>
            <Typography variant="h5">{"Description: "+card.description}</Typography>
            <Typography variant="body2" component="div">
              {"quantity: " + card.quantity}
            </Typography>
            <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${"Price Point:   "+Number(card.pricePoint).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
    </Box>
  );
}

export default Product;