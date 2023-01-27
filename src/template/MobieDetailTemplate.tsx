import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Header'

import Footer from '../component/Footer'
import NavBar from '../component/NavBar'
import HeaderMobileComponent from '../component/HeaderMobileComponent'
import Responesive from '../HOC/Responesive'

type Props = {}

const MobileDetailTemplate = (props: Props) => {
  return (
    <>
    <div className="mobile-detail-template">
        <main>
            {<Outlet/>}
        </main>
        
    </div>
    <Footer/>
    </>
  )
}

export default MobileDetailTemplate