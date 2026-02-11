import { Button, FormControl, InputLabel, Menu, MenuItem, Paper, Select, SelectChangeEvent, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { getAllSellers, updateSellerStatus } from '../../../State/Seller/SellerSlice';
import { AccountStatus } from '../../../Types/SellerType';


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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const accountStatuses = [
  { status:"PENDING_VERFICATION", title:"Pendind verification", description:"Account is not verifired",},
  { status:"ACTIVE", title:"Active", description:"Account is active and in good status",},
  { status:"SUSPENDED", title:"Suspended", description:"Account is temporarily suspended",},
  { status:"DEACTIVATED", title:"Deactivated", description:"Account is deactived",},
  { status:"BANNED", title:"Banned", description:"Account is permenently banned",},
  { status:"CLOSED", title:"Closed", description:"Account is permenently closed",}
]

const SellersTable = () => {
  const dispatch = useAppDispatch()
  const {seller} = useAppSelector(store => store)
  const [accountStatus, setAccountStatus] = useState(AccountStatus.ACTIVE);


  const isAccountStatus = (value: any): value is AccountStatus => {
    return Object.values(AccountStatus).includes(value);
  };
  
  const handleChange = async (event: SelectChangeEvent) => {
    const newStatus = event.target.value;
    if (isAccountStatus(newStatus)) {
      setAccountStatus(newStatus);
      await dispatch(getAllSellers({ status: newStatus, jwt: localStorage.getItem("jwt") || "" }));
    } else {
      console.error("Invalid account status:", newStatus);
    }
  };
  

  const [anchorEl, setAnchorEl] = React.useState<null | any>([]);
  const open = Boolean(anchorEl);
  const handleClick = (event:any,sellerId:number) => {
    setAnchorEl((pre:any)=> ({...pre,[sellerId]:event.currentTarget}));
  };
  const handleClose = (orderId:number) => {
    setAnchorEl((pre:any)=> ({...pre,[orderId]:null}));
  };

  const handleUpdateOrderStatus =(sellerId:number,accStatus:any) => {
    dispatch(updateSellerStatus({sellerId:sellerId,jwt:localStorage.getItem("jwt") || "",status:accStatus}))
  }

  useEffect(() => {
    dispatch(getAllSellers({ status: accountStatus, jwt: localStorage.getItem("jwt") || "" }));
  },[accountStatus])

  return (
    <>
      <div className='pb-5 w-60'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            label="Account Status"
            onChange={handleChange}
          >
            {accountStatuses.map( (item) => <MenuItem key={item.status} value={item.status}>{item.title}</MenuItem>)}

          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Seller Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Mobile</StyledTableCell>
            <StyledTableCell>GSTIN</StyledTableCell>
            <StyledTableCell>Business Name</StyledTableCell>
            <StyledTableCell align="right">Account Status</StyledTableCell>
            <StyledTableCell align="right">Change Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seller.sellers.map((seller) => (
            <StyledTableRow key={seller.id}>
              <StyledTableCell component="th" scope="row">{seller.sellerName}</StyledTableCell>
              <StyledTableCell>{seller.email}</StyledTableCell>
              <StyledTableCell>{seller.mobile}</StyledTableCell>
              <StyledTableCell>{seller.gstin}</StyledTableCell>
              <StyledTableCell>{seller.businessDetails?.businessName}</StyledTableCell>
              <StyledTableCell align="right">{seller.accountStatus}</StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={(e) => handleClick(e,seller.id)}>Change Status</Button>
                 <Menu
                    id={`status-menu ${seller.id}`}
                    anchorEl={anchorEl[seller.id]}
                    open={Boolean(anchorEl[seller.id])}
                    onClose={()=> handleClose(seller.id)}
                    MenuListProps={{
                      'aria-labelledby': `status-menu ${seller.id}`,
                    }}
                  >
                    {accountStatuses.map((AccStatus) => (
                      <MenuItem key={AccStatus.status} onClick={() => handleUpdateOrderStatus(seller.id, AccStatus.status)}>
                        {AccStatus.title}
                      </MenuItem>
                    ))}

                  </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default SellersTable