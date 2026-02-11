import React from 'react'
import SellerRoutes from '../../../Routes/SellerRoutes'
import SellerDrawer from '../../Components/SellerDrawerList/SellerDrawer'

const SellerDashboard = () => {

  return (
    <div>
        <div className='lg:flex lg:h-[90vh]'>
            <section className="hidden lg:block h-full">
                <SellerDrawer />
            </section>

            <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
                <SellerRoutes />
            </section>
        </div>
    </div>
  )
}

export default SellerDashboard