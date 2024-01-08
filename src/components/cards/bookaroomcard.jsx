import React from 'react'
import c1 from "../../assets/specialofferspage/1.png"
import { truncateText, formatDateRange } from "../../utils/utils"

const bookaroomcard = ({ room }) => {
  const date = formatDateRange(room.availability_dates.from,room.availability_dates.to )
  return (
    <>
      <div className='md:w-[550px] w-[290px] flex md:flex-row flex-col gap-3 justify-center items-center'>
        <img src={c1} alt="" />
        <div className='flex flex-col gap-3 justify-center items-center'>
          <div className='w-full flex flex-row justify-between items-center'>
            <p className='font-medium text-[17px] text-white'>{room.room_type || "Room Type 1"}</p>
            <p className='font-medium text-white'>⭐ (5.0)</p>
          </div>
          <p className='text-white'>{truncateText(room.brief_description_of_room,73)||"Lorem ipsum dolor sit amet, consectetuer adi Lorem ipsum dolor sit....."}</p>   {/*73 chars*/}
          <p className='w-full text-start font-light text-white text-[17px]'>{date||"Oct 20 - 28"}</p>
          <div className='w-full flex flex-row justify-between items-center'>
            <p className='text-[20] text-white font-semibold'>{room.price_single + "MK / Night" ||"MK200 / Night"}</p>
            <button className='w-[108px] rounded-md h-[43px] bg-[#DDC87D] text-white'>Book</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default bookaroomcard