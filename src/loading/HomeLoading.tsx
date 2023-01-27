import React from 'react'
import Skeleton from 'react-loading-skeleton'
type Props = {}

const HomeLoading = (props: Props) => {
  return (
    <div className="overlay">
        <span className="loader"></span>
    </div>
  )
}

export default HomeLoading