import React from 'react'
import UserAddressCart from './UserAddressCart'
import { useAppSelector } from '../../../State/Store'

const Address = () => {
  const {auth} = useAppSelector(store => store)
  return (
    <div className='space-y-3'> 
        {auth.user?.address && auth.user.address.length > 0 ? 
        ( auth.user?.address.map( (item) => <UserAddressCart item={item}/>)) :
        (
          <p>No saved addresses found. Add a new address to proceed.</p>
      )}
    </div>
  )
}

export default Address