import { Edit } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import ProfileFieldCard from '../../../Component/ProfileFieldCard'
import PersonalDetails from './PersonalDetails'
import BusinessDetails from './BusinessDetails'
import PickupAddress from './PickupAddress'
import BankDetails from './BankDetails'
import { useAppSelector } from '../../../State/Store'

const Profile = () => {

const {seller} = useAppSelector(store => store)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  

    const [open, setOpen] = React.useState(false);
    const handleOpen = (formName:string) =>{ setOpen(true)
      setSelectedform(formName)
    };
    const handleClose = () => setOpen(false);

  const [selectedform, setSelectedform] = useState("personalDetails")

  const renderSelectedForm = () => {
    switch(selectedform){
      case "personalDetails":
        return <PersonalDetails />;
      case "businessDetails":
        return <BusinessDetails />;
      case "pickupAddress":
        return <PickupAddress />;
      default:
        return <BankDetails />;
    }
  }

  return (
    <div className='lg:px-20 pt-3 pb-20 space-y-20'>

      <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-600 text-2xl">Personal Details</h1>
          <div>
            <Button 
              className='w-16 h-16' 
              onClick={() => handleOpen("personalDetails")}
              variant='contained'
              size='small'
              sx={{borderRadius:"2.9rem"}}> 
              <Edit />
            </Button>
          </div>
        </div>
        <div>
         <div className='items-center flex justify-center pb-3'>
         <Avatar 
            sx={{width:"10rem", height:"10rem"}}
            src='https://images.unsplash.com/photo-1486578077620-8a022ddd481f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFnbGV8ZW58MHx8MHx8fDA%3D' />
         </div>

          <ProfileFieldCard keys='Seller Name' value={seller.profile?.sellerName || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Seller Email' value={seller.profile?.email || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Mobile' value={seller.profile?.mobile || "Not Provided"} />
        </div>
      </div>

      <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-600 text-2xl">Business Details</h1>
          <div>
            <Button 
              className='w-16 h-16' 
              onClick={() => handleOpen("businessDetails")}
              variant='contained'
              size='small'
              sx={{borderRadius:"2.9rem"}}> 
              <Edit />
            </Button>
          </div>
        </div>

        <div>
        
          <ProfileFieldCard keys='Business Name/Brand Name' value={seller.profile?.businessDetails?.businessName || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='GSTIN' value={seller.profile?.gstin || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Account Status' value={seller.profile?.accountStatus || "Not Provided"} />
        </div>
      </div>

      <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-600 text-2xl">Pickup Address</h1>
          <div>
            <Button 
              className='w-16 h-16' 
              onClick={() => handleOpen("pickupAddress")}
              variant='contained'
              size='small'
              sx={{borderRadius:"2.9rem"}}> 
              <Edit />
            </Button>
          </div>
        </div>

        <div>
        
          <ProfileFieldCard keys='Address' value={seller.profile?.pickUpAddress?.address || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='City' value={seller.profile?.pickUpAddress?.city || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='State' value={seller.profile?.pickUpAddress?.state || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Mobile' value={seller.profile?.pickUpAddress?.mobile || "Not Provided"} />
        </div>
      </div>

      <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-600 text-2xl">Bank Details</h1>
          <div>
            <Button 
              className='w-16 h-16' 
              onClick={() => handleOpen("bankDetails")}
              variant='contained'
              size='small'
              sx={{borderRadius:"2.9rem"}}> 
              <Edit />
            </Button>
          </div>
        </div>

        <div>
        
          <ProfileFieldCard keys='Account Holder Name' value={seller.profile?.bankDetails?.accountHolderName || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Account Number' value={seller.profile?.bankDetails?.accountNumber || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='IFSC Code' value={seller.profile?.bankDetails?.ifscCode || "Not Provided"} />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {renderSelectedForm()}
        </Box>
      </Modal>
    </div>
  )
}

export default Profile