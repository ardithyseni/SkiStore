import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {

    return (

        <Card sx={{minHeight: 300, border: "1px solid gray"}}>
            {/* <CardHeader
                
            /> */}
            <CardMedia
                sx={{ height: 140, backgroundSize: "contain", fontWeight: 'bold', mt: 2}}
                image={product.pictureUrl}
                title={product.name}
                
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{fontSize:'h6.fontSize', fontWeight: 'bold'}}>
                   {product.name}
                </Typography>
                <Typography gutterBottom color='secondary' variant="h5" sx={{mt: 4}}>
                    {product.price}€
                </Typography>
            </CardContent>
            <CardActions sx= {{mt: 2}}>
                <Button size="small">Add to cart</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    );
}
