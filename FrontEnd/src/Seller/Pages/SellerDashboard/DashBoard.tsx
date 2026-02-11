import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../State/Store'
import { fetchSellerProfile } from '../../../State/Seller/SellerSlice'

const DashBoard = () => {

  const dispatch = useAppDispatch()

    useEffect(()=>{
      dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""))
    },[dispatch])

  return (
    <div>
        seller Dhasboard
    </div>
  )
}

export default DashBoard