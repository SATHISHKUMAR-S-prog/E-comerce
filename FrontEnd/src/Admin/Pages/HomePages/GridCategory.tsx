import React, { useEffect } from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store'

const GridCategory = () => {

  const {customer} = useAppSelector(store => store)

  useEffect(()=>{
    console.log(customer.homepageData?.gird)
  })

  return (
    <div>
      <HomeCategoryTable data ={customer.homepageData?.gird || []}/>
    </div>
  )
}

export default GridCategory