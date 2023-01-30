import React, {useState} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
type Props = {
  getStar:any
}

const StarRating = (props: Props) => {
    const [rating, setRating] = useState<number>(1);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star,index:number) => {        
        return (         
            <button
            type="button"
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => {
              setRating(index)
              props.getStar(index)
            }}
          >
            <span className="star"><BsFillStarFill className="star-icon"/></span>
          </button>
        );
      })}
    </div>
  )
}

export default StarRating