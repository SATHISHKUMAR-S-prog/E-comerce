import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store'

const DealsCategory = () => {

  const {customer} = useAppSelector(store => store)

  return (
    <div>
      <HomeCategoryTable data ={customer.homepageData?.dealsCategory || []}/>
    </div>
  )
}

export default DealsCategory