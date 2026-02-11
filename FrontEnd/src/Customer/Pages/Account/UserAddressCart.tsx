import React from 'react'
import { Address } from '../../../Types/UserType'

const UserAddressCart = ({item}:{item:Address}) => {
  return (
     <div className='p-5 border rounded-md flex'>
        <div className='space-y-3'>
            <h1>{item.name}</h1>
            <p className='w-[320px]'>{item.address}, {item.city}, {item.state} - {item.pincode}</p>
            <p><strong>Mobile: </strong>{item.mobile}</p>
        </div>
    </div>
  )
}

export default UserAddressCart