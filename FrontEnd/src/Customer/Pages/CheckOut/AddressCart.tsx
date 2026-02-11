import { Radio } from '@mui/material'
import React from 'react'
import { Address } from '../../../Types/UserType'

const AddressCart = ({address}:{address:Address}) => {

    const handleChange =() => {
        
    }

  return (
    <div className='p-5 border rounded-md flex'>
        <div className=''>
            <Radio 
                checked={true}
                onChange={handleChange}
                value=""
                name='radio-button' />
        </div>

        <div className='space-y-3 pt-3'>
            <h1>Name</h1>
            <p className='w-[320px]'>{address.address}, {address.city}, {address.state} - {address.pincode}</p>
            <p><strong>Mobile: </strong>{address.mobile}</p>
        </div>
    </div>
  )
}

export default AddressCart