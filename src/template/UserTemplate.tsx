import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Header'

import Footer from '../component/Footer'

type Props = {}

const Usertemplate = (props: Props) => {
  return (
    <>
    <div className="home-template">
       <Header/>
       
        <main>
            {<Outlet/>}
        </main>
        
    </div>
    <Footer/>
    </>
  )
}

export default Usertemplate