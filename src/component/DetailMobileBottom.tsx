import React,{useRef} from 'react'
import { SelectionDate } from '../types/detailType'
import { DateRange } from 'react-date-range'

type Props = {
    startDate: string
    endDate: string
    price:number,
    setStartDate:any
    setEndDate:any
    submit:()=>void
    selectionRange:SelectionDate
  
}

const DetailMobileBottom = (props: Props) => {

    const dateRangeRef = useRef(null)
    const handleSelect = (date:any) => {
        props.setStartDate(date.selection.startDate); // native Date object
        props.setEndDate(date.selection.endDate); // native Date object
      };

      const handleClick = () => {
            if(dateRangeRef.current){
                (dateRangeRef.current as HTMLElement).classList.toggle("active")
            }
      }
  return (
   <div className="detail__mobile__bottom">
        <div className="detail__mobile__bottom__container">
            <div className='left' onClick={handleClick}>
                <p>${props.price} đêm</p>
                <p>{props.startDate} - {props.endDate}</p>
            </div>
            <div className="right">
                <button onClick={props.submit}>Đặt phòng</button>
            </div>
        </div>

       <div ref={dateRangeRef} className='detail__mobile__date'>
        <button onClick={handleClick} className='btn-close'>Đóng</button>
       <DateRange 
          ranges={[props.selectionRange]}
          minDate={new Date()}
          onChange={(date)=> handleSelect(date)}
          rangeColors={["#FD5861"]}
          fixedHeight={true}
          className="date-range-mobile"
        />
       </div>
   </div>
  )
}

export default DetailMobileBottom