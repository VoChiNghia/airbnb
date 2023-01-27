import React, { useEffect, useState } from 'react'

type Props = {
    component:any
    mobileComponent:any
}

const Responesive = ({component,mobileComponent}:Props) => {
    const [screen,setScreen] = useState({
        width:window.innerWidth,
        
    })
    const handleOnload = () =>{
        setScreen({
            width: window.innerWidth
        })
    }
    useEffect(()=>{
        window.onload = handleOnload
        window.onresize = handleOnload
        
        return () => {
            window.removeEventListener('load',handleOnload)
            window.removeEventListener('resize',handleOnload)
        }
    },[])

    let Component = component

    if(screen.width <= 768 && mobileComponent){
        Component = mobileComponent;
    }

  return (
    <>
    <Component/>
    </>
  )
}

export default Responesive
