import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, Avatar, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/basket";

export default function BasketPage() {

    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        agent.Basket.get()
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);

    if (loading) return <LoadingComponent message="Loading Cart..." />

    if (!basket) return <Typography variant='h3'>Your cart is empty</Typography>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
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
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.price * item.quantity}€</TableCell>
                            <TableCell align="right">
                                <IconButton color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}