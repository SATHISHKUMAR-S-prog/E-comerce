import { Button, Card, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TransactionTable from './TransactionTable'
import { useAppSelector } from '../../../State/Store'

const Payment = () => {
  const {transaction} = useAppSelector(store => store)
  const [totalEarning,setTotalEarnings] = useState(0)
  useEffect(()=> {
    let earning = 0
    transaction.transactions.forEach((price,index)  => {
      earning += price.order.totalSellingPrice || 0
    })
    setTotalEarnings(earning)
    console.log(earning)
  },[transaction])

  return (
    <div>
      <Card className='rounded-md space-y-4 p-5'>
        <h1 className="text-gray-600 font-medium">Total Earnings</h1>
        <h1 className="font-bold text-xl pb-1">₹ {totalEarning || 0}</h1>

        <Divider />
        <p className='text-gray-600 font-medium pt-1'>Last Payment: <strong>₹ {transaction.transactions[transaction.transactions.length -1]?.order?.totalSellingPrice || 0}</strong></p>
      </Card>

      <div className="pt-20 space-y-3">
        <Button variant='contained'>Transaction</Button>
        <TransactionTable />
      </div>
    </div>
  )
}

export default Payment