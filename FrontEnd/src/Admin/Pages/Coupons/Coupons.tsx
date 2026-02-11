import { Delete } from '@mui/icons-material';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteCoupon, getAllCoupons } from '../../../State/Customer/CouponSlice';


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



const Coupons = () => {

  const dispatch = useAppDispatch()
  const {coupon} = useAppSelector(store => store)
  useEffect(()=> {
    dispatch(getAllCoupons(localStorage.getItem("jwt") || ""))
  },[dispatch])

  const handleDelete = (couponId:number) => {
    dispatch(deleteCoupon({couponId,jwt:localStorage.getItem("jwt") || ""}))
  }

  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Coupon Code</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
            <StyledTableCell>Min Order Value</StyledTableCell>
            <StyledTableCell>Discount %</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupon.coupons.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">{row.code}</StyledTableCell>
              <StyledTableCell>{row.validityStartDate}</StyledTableCell>
              <StyledTableCell>{row.validityEndDate}</StyledTableCell>
              <StyledTableCell>{row.minimumOrderValue}</StyledTableCell>
              <StyledTableCell>{row.discountPercentage}</StyledTableCell>
              <StyledTableCell align="right">{row.active? "Active": "Expired"}</StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={() => handleDelete(row.id)}>
                  <Delete/>
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default Coupons