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
import { fetchSellerOrders, updateSellerOrder } from '../../../State/Seller/SellerOrderSlice';
import { Button, Menu, MenuItem } from '@mui/material';

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

const orderStatus = [
  {color: "#FFA500",label:"PENDING"},
  {color: "#F5BCBA",label:"CONFIRMED"},
  {color: "#F5BCBA",label:"PLACED"},
  {color: "#1E90FF",label:"SHIPPED"},
  {color: "#32CD32",label:"DELIVERED"},
  {color: "#FF0000",label:"CANCELLED"}
]

const orderStatusColor = {
  PENDING:{color: "#FFA500",label:"PENDING"},
  CONFIRMED:{color: "#F5BCBA",label:"CONFIRMED"},
  PLACED:{color: "#F5BCBA",label:"PLACED"},
  SHIPPED:{color: "#1E90FF",label:"SHIPPED"},
  DELIVERED:{color: "#32CD32",label:"DELIVERED"},
  CANCELLED:{color: "#FF0000",label:"CANCELLED"}
} 

export default function OrderTable() {
  const dispatch = useAppDispatch()
  const {sellerOrders}= useAppSelector(store => store)

  const [anchorEl, setAnchorEl] = React.useState<null | any>([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: any,orderId:number) => {
    setAnchorEl((pre:any)=> ({...pre,[orderId]:event.currentTarget}));
  };
  const handleClose = (orderId:number) => {
    setAnchorEl((pre:any)=> ({...pre,[orderId]:null}));
  };

  const handleUpdateOrderStatus =(orderId:number,orderStatus:any) => {
    dispatch(updateSellerOrder({orderId:orderId,jwt:(localStorage.getItem("jwt") || ""),orderstatus:orderStatus}))
  }

  React.useEffect(()=>{
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""))
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell >Products</StyledTableCell>
            <StyledTableCell align="right">Shipping Address</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrders.orders.map((order,index) => (
            <StyledTableRow key={index+1}>
              <StyledTableCell component="th" scope="row">
                {order.id}
              </StyledTableCell>
              <StyledTableCell>
                <div className="flex flex-wrap gap-1">
                  {
                    order.orderItems.map((order2Item)=> (<div className='flex gap-5'>
                      <img className='w-20 h-20 rounded-md' src={order2Item.product.images[0]} alt="" />
                      <div className="flex flex-col justify-between py-2">
                        <h1>Title: {order2Item.product.title}</h1>
                        <h1>Selling Price: {order2Item.product.sellingPrice}</h1>
                        <h1>Color: {order2Item.product.color}</h1>
                      </div>
                    </div>
                    ))
                  }
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className="flex flex-col gap-y-2">
                  <h1>{order.shippingAddress.name}</h1>
                  <h1>{order.shippingAddress.address}, {order.shippingAddress.city}</h1>
                  <h1>{order.shippingAddress.state} - {order.shippingAddress.pincode}</h1>
                  <h1><strong>Mobile: </strong>{order.shippingAddress.mobile}</h1>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <span className='border rounded-full border-primary-color px-5 py-2 text-primary-color'>{order.orderstatus}</span>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  // id={`status-menu ${order.id}`}
                  // aria-controls={open ? `status-menu ${order.id}` : undefined}
                  // aria-haspopup="true"
                  // aria-expanded={open ? 'true' : undefined}
                  onClick={(e)=> handleClick(e,order.id)}
                >
                  Status
                </Button>
                <Menu
                  id={`status-menu ${order.id}`}
                  anchorEl={anchorEl[order.id]}
                  open={Boolean(anchorEl[order.id])}
                  onClose={()=> handleClose(order.id)}
                  MenuListProps={{
                    'aria-labelledby': `status-menu ${order.id}`,
                  }}
                >
                 {orderStatus.map((status)=> 
                 <MenuItem key={status.label} onClick={()=> handleUpdateOrderStatus(order.id,status.label)}>.
                  {status.label}
                </MenuItem>)}
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}