import { Delete, Edit } from '@mui/icons-material';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { HomeCategory } from '../../../Types/HomeCategoryType';


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

const HomeCategoryTable = ({data}:{data:HomeCategory[]}) => {

  const [accountStatus , setAccountStatus] = useState('ACTIVE');

  const handleChange = (event: SelectChangeEvent) => {
    setAccountStatus(event.target.value);
  };

  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data,index) => (
            <StyledTableRow key={data.id}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{data.id}</StyledTableCell>
              <StyledTableCell>
                <img className='w-20 h-25 rounded-md' src={data.images} alt="" />
              </StyledTableCell>
              <StyledTableCell align="right">{data.categoryId}</StyledTableCell>
              <StyledTableCell align="right">
                <Button>
                  <Edit/>
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

export default HomeCategoryTable