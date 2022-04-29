import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";


export default function BasketSummary() {

    const {basket} = useStoreContext();
    
    // The final result of running the reducer across all elements of the array is a single value.
    // the sum is gonna be our value, iterate over items, add sum with qntty * price, start at 0, if null | undefined set to 0
    const subtotal = basket?.items.reduce((sum, items) => sum + (items.quantity * items.price), 0) ?? 0;
    const deliveryFee = subtotal > 100 ? 0 : 10;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal}€</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee}€</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{subtotal + deliveryFee}€</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over 100€ qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}