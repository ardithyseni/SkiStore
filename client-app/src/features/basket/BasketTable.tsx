// reusable component
import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({items, isBasket = true}: Props) {

    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

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
                            { isBasket && 
                            <TableCell align="right"></TableCell> }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => (
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
                                { isBasket &&
                                    <LoadingButton
                                        loading={status.includes('pendingRemoveItem' + item.productId + 'rem')}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, 
                                            quantity: 1,
                                            name: 'rem'
                                        }))}
                                        color='error'>
                                        <Remove />
                                    </LoadingButton> }
                                    {item.quantity}
                                    { isBasket &&
                                    <LoadingButton
                                        loading={status === ('pendingAddItem' + item.productId)}
                                        onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}
                                        color='secondary'>
                                        <Add />
                                    </LoadingButton> }
                                </TableCell>
                                <TableCell align="right">{item.price * item.quantity}€</TableCell>
                                { isBasket &&
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
                                </TableCell> }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}