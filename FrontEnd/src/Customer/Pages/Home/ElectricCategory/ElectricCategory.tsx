import React from 'react'
import ElectricCategoryCard from './ElectricCategoryCard'
import { useAppSelector } from '../../../../State/Store'
import { useMediaQuery, useTheme } from '@mui/material'

const ElectricCategory = () => {
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"))
  const isMid = useMediaQuery(theme.breakpoints.up("md"))
  const {customer} = useAppSelector(store => store)
  const screen = isLarge ? 8 : isMid ? 6 : 5
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
        { customer.homepageData?.electricCategory.slice(0,screen).map( (item,index) => <ElectricCategoryCard key={index} item={item}/>)}
        
    </div>
  )
}

export default ElectricCategory