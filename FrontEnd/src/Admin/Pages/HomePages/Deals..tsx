import { Button } from '@mui/material'
import React, { useState } from 'react'
import DealsTable from './DealsTable'
import DealsCategory from './DealsCategory'
import CreateDealForm from './CreateDealForm'

const Deals = () => {

const tabs =[
  "Deals",
  "Category",
  "Create Deal"
]

const [activeTab, setActiveTab] = useState("Deals")

  return (
    <div>
      <div className="flex gap-4">
        {tabs.map((item)=><Button key={item} onClick={() => setActiveTab(item)} variant={activeTab == item? "contained": "outlined"}>{item}</Button>)}
      </div>
      <div className="mt-5">
        {activeTab == "Deals"? <DealsTable /> : activeTab == "Category"? <DealsCategory /> : 
        <div className='mt-5 flex flex-col justify-center items-center  h-[70vh]'><CreateDealForm /></div>}
      </div>
    </div>
  )
}

export default Deals