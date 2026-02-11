import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store'

const ShopByCategory = () => {

const {customer} = useAppSelector(store => store)

  return (
    <div>
      <HomeCategoryTable data ={customer.homepageData?.shopByCategory || []}/>
    </div>
  )
}

export default ShopByCategory