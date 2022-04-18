import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDetails() {

    // Returns an object of the params for the route rendered.
    const { id } = useParams<{ id: string }>();

    // explicitly telling that we are using Products or null, setting it into null default
    // useState is a Hook that allows you to have state variables in functional components.
    const [product, setProduct] = useState<Product | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(response => setProduct(response.data)) // return data of json response
            .catch(error => console.log(error)) // if != 200OK  show error
            .finally(() => setLoading(false));
    }, [id]) // the get will get called when component mounts && if id changes

    if (loading) return <h3>Loading...</h3>

    if(!product) return <h3>Product not found</h3>

    return (
        <Typography variant='h2'>
            {product.name}
        </Typography>
    )
}