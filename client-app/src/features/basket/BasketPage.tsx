import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton, Paper, Table, TableBody, TableCell, Avatar, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketPage() {

    const {basket, setBasket, removeItem} = useStoreContext();
    const [loading, setLoading] = useState(false);

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    function handleRemoveItem(productId: number, quantity = 1) {
        setLoading(true);
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
            
    }

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
                                    loading={loading} 
                                    onClick={() => handleRemoveItem(item.productId)} 
                                    color='error'>
                                    <Remove/>
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton 
                                    loading={loading} 
                                    onClick={() => handleAddItem(item.productId)}
                                    color='secondary'>
                                    <Add/>
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">{item.price * item.quantity}€</TableCell>
                            <TableCell align="right">
                                <LoadingButton 
                                    loading={loading} 
                                    onClick={() => handleRemoveItem(item.productId, item.quantity)} 
                                    color="error">
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}