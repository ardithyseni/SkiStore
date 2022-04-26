import { LoadingButton } from "@mui/lab";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {

    const [loading, setLoading] = useState(false);

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (

        <Card sx={{minHeight: 300, border: "1px solid gray"}}>
            {/* <CardHeader
                
            /> */}
            <CardMedia
                sx={{ height: 190, backgroundSize: "contain", fontWeight: 'bold', mt: 2}}
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
                <LoadingButton 
                    loading={loading} 
                    onClick={() => handleAddItem(product.id)} 
                    size="small">Add to cart</LoadingButton>
                     
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    );
}
