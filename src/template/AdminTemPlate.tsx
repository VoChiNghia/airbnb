import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../component/adminComponent/AdminHeader'
import AdminSidebar from '../component/adminComponent/AdminSidebar'
import { useMediaQuery } from 'react-responsive'

type Props = {}

const AdminTemPlate = (props: Props) => {

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    
  return (
    <>
    {
      isTabletOrMobile ? <h1>
        Not Suport on Mobile devices
      </h1> 
      : <div className='admin__template'>
      <div className="admin__template__left">
          <AdminSidebar/>
      </div>
      <div className="admin__template__right">
          <AdminHeader/>

          <section>
             <Outlet/>
          </section>
      </div>
     
  </div>
    }
    </>
  )
}

export default AdminTemPlate