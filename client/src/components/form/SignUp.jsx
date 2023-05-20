import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../Navbar';

export default function MediaCard() {
  // An array of card data
  const cards = [
    {
      title: "Lizard",
      image: "https://cdn.mos.cms.futurecdn.net/6AxBGxrtbSAkmhLmtdvGLX-1200-80.jpg",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
    },
    {
      title: "Elephant",
      image: "https://iso.500px.com/wp-content/uploads/2014/08/2048-5.jpg",
      description: "Elephants are mammals of the family Elephantidae and the largest existing land animals."
    },
    {
      title: "Panda",
      image: "https://img.freepik.com/premium-photo/cute-humorous-baby-panda-hanging-from-bamboo_410516-25873.jpg?w=2000",
      description: "The giant panda, also known as the panda bear or simply the panda, is a bear native to south central China."
    },
    {
      title: "Flamingo",
      image: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/320036721/1800",
      description: "Flamingos or flamingoes are a type of wading bird in the family Phoenicopteridae, the only bird family in the order Phoenicopteriformes."
    },
    {
      title: "Tiger",
      image: "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg",
      description: "The tiger is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange-brown fur with a lighter underside."
    },
    {
      title: "Penguin",
      image: "https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg",
      description: "Penguins are a group of aquatic, flightless birds. They live almost exclusively in the Southern Hemisphere, with only one species, the Galápagos penguin, found north of the equator."
    }
  ];
  const [isSidebarOpen,setIsSidebarOpen] = React.useState(true)

  return (
    <Box>

      <Navbar  
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
    
    
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* Map over the card data and render each card */}
      {cards.map((card) => (
        <Card sx={{ maxWidth: 345, margin: 20 }}>
          <CardMedia
            component="img"
            height="140"
            image={card.image}
            alt={card.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
    </Box>
  );
}
