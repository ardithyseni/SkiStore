import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product
}

export default function ProductCard({product}: Props) {

    return (
        
        <Card >
      <CardMedia
        component="img"
        height="140"
        image="http://picsum.photos/200"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        
        // <ListItem key={product.id}>
        //       <ListItemAvatar>
        //           <Avatar src={product.pictureUrl}/>
        //       </ListItemAvatar>
        //       <ListItemText>
        //           {product.name} — {product.price}
        //       </ListItemText>
        //   </ListItem>
    )

}