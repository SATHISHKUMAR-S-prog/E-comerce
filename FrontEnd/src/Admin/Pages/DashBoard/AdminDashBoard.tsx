import React, { useEffect } from 'react'
import AdminRoute from '../../../Routes/AdminRoute'
import { useAppDispatch } from '../../../State/Store'
import { fetchHomeCategory } from '../../../State/Admin/AdminSlice'
import AdminDrawer from '../../Components/AdminDrawer'

const AdminDashBoard = () => {

const dispatch = useAppDispatch()

useEffect(()=>{
  dispatch(fetchHomeCategory())
},[dispatch])

  return (
    <div>
    <div className='lg:flex lg:h-[90vh]'>
        <section className="hidden lg:block h-full">
           <AdminDrawer/>
        </section>

        <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
            <AdminRoute />
        </section>
    </div>
</div>
  )
}

export default AdminDashBoard