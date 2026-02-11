import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store'

const ElectronicsCategory = () => {

  const {customer} = useAppSelector(store => store)

  return (
    <div>
      <HomeCategoryTable data ={customer.homepageData?.electricCategory || []}/>
    </div>
  )
}

export default ElectronicsCategory