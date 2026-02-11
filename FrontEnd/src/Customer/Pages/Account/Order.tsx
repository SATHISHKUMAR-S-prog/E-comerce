import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchUserOrderHistory } from '../../../State/Customer/OrderSlice'
import OrderItemCard from './OrderItemCard'

const Order = () => {
  const dispatch = useAppDispatch()
  const {order} = useAppSelector(store => store)

 
  useEffect(() => {
    const jwt = localStorage.getItem('jwt') || '';
    if (jwt) {
      dispatch(fetchUserOrderHistory(jwt));
    }
  }, [dispatch]);

  return (
    <div className='text-sm min-h-screen'>
      <div className='pb-5'>
        <h1 className='font-semibold'>All Orders</h1>
        <p>From anytime</p>
      </div>
      <div className='space-y-2'>
          {order.orders.map((orders) => orders.orderItems.map((item) => <OrderItemCard key={item.id} order={orders} item={item}/>))}
      </div>
    </div>
  )
}

export default Order