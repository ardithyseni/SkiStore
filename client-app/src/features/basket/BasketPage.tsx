import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Paper, Table, TableBody, TableCell, Avatar, TableContainer, TableHead, TableRow, Typography, Grid, Button } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {

    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    // const [status, setStatus] = useState({
    //     loading: false,
    //     name: ''
    // });

    // function handleAddItem(productId: number, name: string) {
    //     setStatus({ loading: true, name });
    //     agent.Basket.addItem(productId)
    //         .then(basket => dispatch(setBasket(basket)))
    //         .catch(error => console.log(error))
    //         .finally(() => setStatus({ loading: false, name: '' }))
    // }

    // function handleRemoveItem(productId: number, quantity = 1, name: string) {
    //     setStatus({ loading: true, name });
    //     agent.Basket.removeItem(productId, quantity)
    //         .then(() => dispatch(removeItem({productId, quantity})))
    //         .catch(error => console.log(error))
    //         .finally(() => setStatus({ loading: false, name: '' }))

    // }

    // const [loading, setLoading] = useState(true);
    // const [basket, setBasket] = useState<Basket | null>(null);

    // useEffect(() => {
    //     agent.Basket.get()
    //         .then(basket => setBasket(basket))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))
    // }, []);

    // if (loading) return <LoadingComponent message="Loading Cart..." />

    if (!basket) return <Typography variant='h3'>Your cart is empty</Typography>

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map(item => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar
                                        variant="square"
                                        src={item.pictureUrl}
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>

                                <TableCell align="right">{item.price} €</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status.includes('pendingRemoveItem' + item.productId + 'rem')}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, 
                                            quantity: 1,
                                            name: 'rem'
                                        }))}
                                        color='error'>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status === ('pendingAddItem' + item.productId)}
                                        onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}
                                        color='secondary'>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{item.price * item.quantity}€</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === ('pendingRemoveItem' + item.productId + 'del')}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, 
                                            quantity: item.quantity,
                                            name: 'del'
                                        }))}
                                        color="error">
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />                
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to="/checkout"
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        Checkout
                    </Button> 
                </Grid>
                               
            </Grid>
        </Fragment>

    )

}