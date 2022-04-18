import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";

export default function ProductDetails() {

    // Returns an object of the params for the route rendered.
    const { id } = useParams<{ id: string }>();

    // explicitly telling that we are using Products or null, setting it into null default
    // useState is a Hook that allows you to have state variables in functional components.
    const [product, setProduct] = useState<Product | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response)) // return data of json response
            .catch(error => console.log(error)) // if != 200OK  show error
            .finally(() => setLoading(false));
    }, [id]) // the get will get called when component mounts && if id changes

    if (loading) return <h3>Loading...</h3>

    if(!product) return <h3>Product not found</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img 
                    src={product.pictureUrl} 
                    alt={product.name} 
                    style={{width: '100%'}}
                />
           </Grid>
           <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>

                <Divider sx={{mb: 2}} />

                <Typography variant='h4' color='secondary'>{product.price}€</Typography>

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

           </Grid>
        </Grid>
    )
}