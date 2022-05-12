import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {

    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    // Returns an object of the params for the route rendered.
    const { id } = useParams<{ id: string }>();

    const product = useAppSelector(state => productSelectors.selectById(state, id));

    const {status: productStatus} = useAppSelector(state => state.catalog);

    // explicitly telling that we are using Products or null, setting it into null default
    // useState is a Hook that allows you to have state variables in functional components.
    // const [product, setProduct] = useState<Product | null>(null);

    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);


    useEffect(() => {
        if (item) setQuantity(item.quantity);

        if (!product) dispatch(fetchProductAsync(parseInt(id)));

        // agent.Catalog.details(parseInt(id)).then(response => setProduct(response)) // return data of json response
        //     .catch(error => console.log(error.response)) // if != 200OK  show axios error response
        //     .finally(() => setLoading(false));

    }, [id, item, dispatch, product]) // the get will get called when component mounts && if id changes

    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    // funksioni per update quantity
    // we can 1. add items to the cart 2. add quantity, 3. lower the quantity
    function handleUpdateCart() {

        if (!item || quantity > item.quantity) {

            const updatedQuantity = item ? quantity - item.quantity : quantity
            dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }))

        }
        else { // if we do have an item 
            const updatedQuantity = item.quantity - quantity;
            
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading product..." />

    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img
                    src={product.pictureUrl}
                    alt={product.name}
                    style={{ width: '100%' }}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>

                <Divider sx={{ mb: 2 }} />

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

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || (!item && quantity === 0)}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}

