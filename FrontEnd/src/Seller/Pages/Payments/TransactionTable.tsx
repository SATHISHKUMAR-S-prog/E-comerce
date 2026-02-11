import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchtransactionBySellerId } from '../../../State/Seller/TransactionSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TransactionTable() {

const dispatch = useAppDispatch()
const {transaction} = useAppSelector(store => store)

React.useEffect(()=>{
  dispatch(fetchtransactionBySellerId(localStorage.getItem("jwt") || ""))
},[dispatch])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Customer details</StyledTableCell>
            <StyledTableCell align="right">Order</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {transaction.transactions.map((trans) => (
            <StyledTableRow key={trans.id}>
              <StyledTableCell component="th" scope="row">
                {trans.date}
              </StyledTableCell>
              <StyledTableCell align="right">{trans.customer.email}</StyledTableCell>
              <StyledTableCell align="right">{trans.order.id}</StyledTableCell>
              <StyledTableCell align="right">₹ {trans.order.totalSellingPrice}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}