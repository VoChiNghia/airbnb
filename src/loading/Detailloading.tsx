import React from 'react'
import Skeleton from 'react-loading-skeleton'
type Props = {}

const Detailloading = (props: Props) => {
  return (
    <div className="detail__loading">
      <Skeleton height='30px' width='800px' />
      <Skeleton width={600}/>
      <Skeleton height='440px' />
        <div className='detail__loading-wrapper'>
            <div>
            <Skeleton  width={800} height='25px'/>
            <Skeleton  width={600} />
                <hr />
                <Skeleton  height='66px'/>
                <Skeleton height='66px'/>
                <Skeleton height='66px'/>

                <hr />
                <Skeleton  height='66px'/>
                <Skeleton height='100px'/>
            </div>
            <div >
            <Skeleton height='50px'/>
            <Skeleton height='115px'/>
            <Skeleton height='47px'/>
            <Skeleton width='400px' height='30px'/>
            <Skeleton />
                
            
            </div>
        </div>
        
    </div>
  )
}

export default Detailloading